import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@/components/pages/Auth'
import createuser from '@/components/pages/Createuser'
import Index from '@/components/pages/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
  },

  {
    path: '/news/:domain_tags',
    name: 'news',
    component: Index,
  },

  {
    path: '/bookmark/:username',
    name: 'bookmark',
    component: Index,
  },

  {
    path: '/auth',
    name: 'Auth',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Auth,
  },
  {
    path: '/createuser',
    name: 'Createuser',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: createuser,
  },
]

const router = new VueRouter({
  routes,
})

export default router
