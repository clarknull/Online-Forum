
const routes = [
  {
    path: '/auth',
    component: () => import('layouts/Authentication.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), meta: { requiresAuth: true } },
      { path: 'account', component: () => import('pages/account/Profile.vue'), meta: { requiresAuth: true } },
      { path: 'profile', component: () => import('pages/account/ProfileEdit.vue'), meta: { requiresAuth: true } },
      { path: 'single', component: () => import('pages/Single.vue'), meta: { requiresAuth: true } }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
