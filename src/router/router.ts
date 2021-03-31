import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Money from '@/views/Money.vue'
import NotFound from '@/views/NotFound.vue'
import Detail from '@/views/Detail.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
