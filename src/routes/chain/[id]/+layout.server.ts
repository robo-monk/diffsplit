import type { Chain } from '$lib/server/repositories/chain.repository';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, params }) => {
    console.log('-> yo ')
    return {
        // posts: await db.getPostSummaries()
        chain: JSON.parse(cookies.get(`chain#${params.id}`) || '{}') as Chain & { id: string },
    };
}) satisfies LayoutServerLoad;
