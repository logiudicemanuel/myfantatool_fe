import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/components/FantaHome.vue')
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('@/components/FantaTeams.vue')
    },
    {
      path: '/goasta',
      name: 'goasta',
      component: () => import('@/components/FantaGoAsta.vue')
    }
  ],
})

export default router
