import { ChainRepository, type Chain } from '$lib/server/repositories/chain.repository';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { UserRepository } from '$lib/server/repositories/user.repository';
import { CookieService } from '$lib/server/services/cookies.service';
import type { LayoutData, LayoutServerData } from '../$types';
// import type { PageServerLoad, Actions } from './$types';
// import { fail } from '@sveltejs/kit';

// export const load = (async ({ cookies, params }) => {
//     const chainId = params.id
//     console.log('-> yo ')
//     const ret = {
//         test: 1,
//         chain: JSON.parse(cookies.get('chain') || '{}') as Chain,
//     }

//     console.log('-> ret', ret)
//     return ret;
// }) satisfies PageServerLoad;


export const actions = {
    join: async ({ cookies, request, params }) => {
        const chainRepository = new ChainRepository()
        const userRepository = new UserRepository()
        const cookieService = new CookieService(cookies)

        const data = await request.formData();
        const chainId = data.get('chainId');
        const username = data.get('username');

        console.log("-> chain id is", chainId);

        if (!username) return fail(400, { missing: 'username' });
        if (!chainId) return fail(400, { missing: 'chainId' });

        console.log('mutating chain', chainId)
        const updateChain = await chainRepository.mutate(chainId.toString(), (chain) => {
            console.log("mutating chain", chain, chainId);
            const existingUser = chain.users.find((user) => user.username === username);
            // ASK FOR PIN
            // if (existingUser) throw fail(400, { error: 'Username already taken' });

            const user = existingUser || userRepository.create({
                username: username.toString(),
            });

            console.log('-> store user entity', user)
            cookieService.storeEntity(user, 'user');

            if (!existingUser) chain.users.push(user)
            return chain
        })
        // const chain = chainRepository.create({
        //     name: name.toString(),
        //     users: []
        // });

        console.log('-> chain', updateChain)

        await chainRepository.flush()
        cookieService.storeEntity(updateChain);

        throw redirect(301, `/chain/${updateChain.id}/invite`);
        return { success: true, updateChain };
    }
} satisfies Actions;

//         // const email = data.get('email');
//         // const password = data.get('password');

//         // const user = await db.getUser(email);

//         return { success: true };
//     },
//     register: async (event) => {
//         // TODO register the user
//     }
// } satisfies Actions;
