import { route } from 'quasar/wrappers'
import router from '.'

const routes = [
  {
    name:"index",
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    name:"login",
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    name:"register",
    path: '/register',
    component: () => import('layouts/RegisterLayout.vue'),
  },
  {
    name:"editor",
    path: '/editor',
    component: () => import('layouts/EditLayout.vue'),
    children:[
      { path: '/ide',name:"ide", component: () => import('pages/IDEPage.vue') }
    ]
  },
  {
    name:"createService",
    path: '/createService',
    component: () => import('layouts/CreateServiceLayout.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]



export default routes
