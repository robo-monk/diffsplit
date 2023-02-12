import { ChainRepository, type Chain } from '$lib/server/repositories/chain.repository';
import { fail, redirect, type Cookies } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { UserRepository } from '$lib/server/repositories/user.repository';
import { CookieService } from '$lib/server/services/cookies.service';
import type { LayoutData, LayoutServerData } from '../../$types';
import { ExpenseRepository } from '$lib/server/repositories/expense.repository';
import type { StoredIEntity } from '$lib/server/services/kv.service';
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

function dependencyInjector(params: { cookies: Cookies }) {
    return {
        chainRepository: new ChainRepository(),
        userRepository: new UserRepository(),
        cookieService: new CookieService(params.cookies),
        expenseRepository: new ExpenseRepository()
    }
}

export const actions = {
    create: async ({ cookies, request, params, locals }) => {
        const { chainRepository, userRepository, cookieService, expenseRepository } = dependencyInjector({ cookies })

        const data = await request.formData();
        const chain = locals.chain as Chain & StoredIEntity;
        // const chainId = data.get('chainId');

        const expense = expenseRepository.create({
            name: data.get('name') as string,
            amount: 0,
            splits: [],
        })

        chain.expenses.push(expense);
        const updateChain = chainRepository.update(chain);

        // const chain = chainRepository.create({
        //     name: name.toString(),
        //     users: []
        // });

        console.log('-> chain', updateChain)

        await chainRepository.flush()

        cookieService.storeEntity(updateChain);

        throw redirect(301, `/chain/${updateChain.id}/expenses/${expense.id}`);
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
