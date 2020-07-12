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
    name: 'Home',
    component: () => import('../views/Home')
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
