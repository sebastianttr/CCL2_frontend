
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    path: '/register',
    component: () => import('layouts/RegisterLayout.vue'),
  },
  {
    path: '/editor',
    component: () => import('layouts/EditLayout.vue'),
    children:[
      { path: '/ide', component: () => import('pages/IDEPage.vue') }
    ]
  },
  {
    path: '/createService',
    component: () => import('layouts/CreateServiceLayout.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
