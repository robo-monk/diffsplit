import { ChainRepository, type Chain } from '$lib/server/repositories/chain.repository';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../../new/$types';
import { UserRepository } from '$lib/server/repositories/user.repository';
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
        const data = await request.formData();
        // console.log('-> data', data)
        const chainId = data.get('chainId');
        const username = data.get('username');
        if (!username) return fail(400, { missing: 'username' });
        if (!chainId) return fail(400, { missing: 'chainId' });

        const updateChain = await chainRepository.mutate(chainId.toString(), (chain) => {
            // const existingUser = chain.users.find((user) => user.username === username);
            // if (existingUser) throw fail(400, { error: 'Username already taken' });

            const user = userRepository.create({
                username: username.toString(),
            })

            chain.users.push(user)
            return chain
        })
        // const chain = chainRepository.create({
        //     name: name.toString(),
        //     users: []
        // });

        console.log('-> chain', updateChain)

        await chainRepository.flush()

        cookies.set(`chain#${updateChain.id}`, JSON.stringify(updateChain));
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
