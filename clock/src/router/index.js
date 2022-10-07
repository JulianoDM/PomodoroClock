import Vue from 'vue'
import VueRouter from 'vue-router'
import Clock from '../components/Clock.vue'


Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      component: Clock
    }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
