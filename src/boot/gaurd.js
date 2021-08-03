
export default ({ store, router }) => {
  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
      if (!store.getters.isAuth) {
        next('/auth')
      } else { next() }
    } else { next() }
  })
}
