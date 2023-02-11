import type { Chain } from '$lib/server/repositories/chain.repository';
import type { User } from '$lib/server/repositories/user.repository';
import { CookieService } from '$lib/server/services/cookies.service';
import { ChainRepository } from '$lib/server/repositories/chain.repository';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ cookies, params, url }) => {
    const cookieService = new CookieService(cookies)
    const chainRepository = new ChainRepository()
    const chain = cookieService.getEntity<Chain>(params.id) || await chainRepository.get(params.id);

    if (chain) cookieService.storeEntity(chain);

    const user = cookieService.getEntity<User>('user');
    if (!user && url.pathname != `/chain/${params.id}/join`) throw redirect(301, `/chain/${params.id}/join`);
    // const chainService = new ChainService()
    return {
        chain,
        user
        // posts: await db.getPostSummaries()
        // chain: JSON.parse(cookies.get(`chain#${params.id}`) || '{}') as Chain & { id: string },
        // chain: JSON.parse(cookies.get(`chain#${params.id}`) || '{}') as Chain & { id: string },
    };
}) satisfies LayoutServerLoad;
