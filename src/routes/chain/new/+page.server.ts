import type { PageServerLoad, Actions } from './$types';
 
// export const load = (async ({ cookies }) => {
//   const user = await db.getUserFromSession(cookies.get('sessionid'));
//   return { user };
// }) satisfies PageServerLoad;
 
export const actions = {
  createChain: async ({ cookies, request }) => {
    const data = await request.formData();
    console.log('-> data', data)
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
