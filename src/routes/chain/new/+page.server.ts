import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { ChainRepository } from '$lib/server/repositories/chain.repository';
import { CookieService } from '$lib/server/services/cookies.service';
 
// export const load = (async ({ cookies }) => {
//   const user = await db.getUserFromSession(cookies.get('sessionid'));
//   return { user };
// }) satisfies PageServerLoad;
 
export const actions = {
  createChain: async ({ cookies, request }) => {
    const chainRepository = new ChainRepository()
    const cookieService = new CookieService(cookies);

    const data = await request.formData();
    // console.log('-> data', data)
    const name = data.get('chainName');
    // if (!name) return { success: false, message: 'Missing chain name' };
    if (!name) return fail(400, { missing: 'chainName' });

    const chain = chainRepository.create({
      name: name.toString(),
      users: [],
      expenses: []
    });

    console.log('-> chain', chain)

    await chainRepository.flush()
    cookieService.storeEntity(chain);

    throw redirect(301, `/chain/${chain.id}/join`);
    return { success: true, chain };
 
  },
  register: async (event) => {
    // TODO register the user
  }
} satisfies Actions;
