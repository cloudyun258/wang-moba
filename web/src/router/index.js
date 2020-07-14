import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '*',
    name: '404',
    component: () => import('@/views/404'),
  },

  {
    path: '/',
    name: 'Main',
    redirect: '/home',
    component: () => import('../views/Main'),
    children: [
      { path: 'home', name: 'home', component: () => import('../views/Home') },
      { path: 'strategy', name: 'strategy', component: () => import('../views/Strategy') },
      { path: 'match', name: 'match', component: () => import('../views/Match') }
    ]
  }

]

const router = new VueRouter({
  routes
})

// 禁止相同路由跳转时打印错误信息
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export default router
