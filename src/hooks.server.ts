
import { ChainRepository, type Chain } from '$lib/server/repositories/chain.repository';
import { ExpenseRepository } from '$lib/server/repositories/expense.repository';
import { UserRepository } from '$lib/server/repositories/user.repository';
import { CookieService } from '$lib/server/services/cookies.service';
import { redirect, type Cookies, type Handle } from '@sveltejs/kit';

function dependencyInjector(params: { cookies: Cookies }) {
    return {
        chainRepository: new ChainRepository(),
        userRepository: new UserRepository(),
        cookieService: new CookieService(params.cookies),
        expenseRepository: new ExpenseRepository()
    }
}

function redirectIf(url: URL, condition: boolean, to: string) {
    // console.log('-> redirectIf', url.pathname, condition, to)
    if (condition && url.pathname != to) throw redirect(303, to);
}

export const handle = (async ({ event, resolve }) => {
    const {
        chainRepository,
        userRepository,
        cookieService,
        expenseRepository
    } = dependencyInjector({ cookies: event.cookies });

    const user = cookieService.getEntity('user');
    const chain = event.params.chainId
        ? cookieService.getEntity<Chain>(event.params.chainId) || await chainRepository.get(event.params.chainId)
        : null;

    console.log('-> chain', chain, event.params.chainId)
    const expense = event.params.expenseId
        ? chain?.expenses.find(expense => expense.id === event.params.expenseId)
        : null;


    if (chain) cookieService.storeEntity(chain)
    if (user) cookieService.storeEntity(user);

    redirectIf(event.url, !chain && !event.url.pathname.includes('/chain/new'), `/`)
    redirectIf(event.url, !!(chain && !user), `/chain/${event.params.chainId}/join`)


    event.locals = {
        ...event.locals,
        user, chain, expense,
    }

    const response = await resolve(event);
    return response;
}) satisfies Handle;
