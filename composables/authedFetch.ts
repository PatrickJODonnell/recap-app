export const authedFetch = $fetch.create({
  onRequest: async (ctx) => {
    const header = new Headers(ctx.options.headers);
    if (!header.has('Authorization')) {
      const { $auth } = useNuxtApp();
      console.log("auth", $auth);
      const user = $auth.currentUser;
      const token = await user?.getIdToken();
      if (token) {
        header.set('Authorization', `Bearer ${token}`);
      }
    }
    ctx.options.headers = header;
  }
});