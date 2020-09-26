/* eslint-disable */
import { createRouter, createWebHashHistory } from 'vue-router'
const routes: Array<any> = [
  {
    path: '/todomvc',
    name: 'todomvc',
    props: (route: any) => ({ condition: route.query.q }),
    component: () => import('@/views/Todomvc.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
