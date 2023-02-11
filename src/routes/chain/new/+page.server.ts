import type { PageServerLoad, Actions } from './$types';
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
    if (!name) return { success: false, message: 'Missing chain name' };

    const chain = chainRepository.create({
      name: name.toString(),
      users: []
    });

    console.log('-> chain', chain)

    await chainRepository.flush()

    return { success: true, chain };

    // const email = data.get('email');
    // const password = data.get('password');
 
    // const user = await db.getUser(email);
    // cookies.set('sessionid', await db.createSession(user));
 
    return { success: true };
  },
  register: async (event) => {
    // TODO register the user
  }
} satisfies Actions;
