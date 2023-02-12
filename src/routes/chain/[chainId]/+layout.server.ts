import type { Chain } from '$lib/server/repositories/chain.repository';
import type { User } from '$lib/server/repositories/user.repository';
import { CookieService } from '$lib/server/services/cookies.service';
import { ChainRepository } from '$lib/server/repositories/chain.repository';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ cookies, params, url, locals }) => {
    // const cookieService = new CookieService(cookies)
    // const chainRepository = new ChainRepository()
    // const chain = cookieService.getEntity<Chain>(params.chainId) || await chainRepository.get(params.chainId);

    // if (chain) cookieService.storeEntity(chain);

    // const user = cookieService.getEntity('user');
    // console.debug('-> user', user)
    // console.debug('-> url', url.pathname, { params })
    // if (!user && url.pathname != `/chain/${params.chainId}/join`) throw redirect(301, `/chain/${params.chainId}/join`);
    // const chainService = new ChainService()
    return {
        chain: locals.chain,
        user: locals.user,
        expense: locals.expense,
        // posts: await db.getPostSummaries()
        // chain: JSON.parse(cookies.get(`chain#${params.id}`) || '{}') as Chain & { id: string },
        // chain: JSON.parse(cookies.get(`chain#${params.id}`) || '{}') as Chain & { id: string },
    };
}) satisfies LayoutServerLoad;
