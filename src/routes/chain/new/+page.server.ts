import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { ChainRepository } from '$lib/server/repositories/chain.repository';
 
// export const load = (async ({ cookies }) => {
//   const user = await db.getUserFromSession(cookies.get('sessionid'));
//   return { user };
// }) satisfies PageServerLoad;
 
export const actions = {
  createChain: async ({ cookies, request }) => {
    const chainRepository = new ChainRepository()
    const data = await request.formData();
    // console.log('-> data', data)
    const name = data.get('chainName');
    // if (!name) return { success: false, message: 'Missing chain name' };
    if (!name) return fail(400, { missing: 'chainName' });

    const chain = chainRepository.create({
      name: name.toString(),
      users: []
    });

    console.log('-> chain', chain)

    await chainRepository.flush()

    cookies.set(`chain#${chain.id}`, JSON.stringify(chain));

    // throw redirect(307, `/chain/${chain.id}/join`);

    // const email = data.get('email');
    // const password = data.get('password');
 
    // const user = await db.getUser(email);
 
    return { success: true, chain };
  },
  register: async (event) => {
    // TODO register the user
  }
} satisfies Actions;
