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
      { path: 'match', name: 'match', component: () => import('../views/Match') },
      { 
        path: 'article/detail/:id', 
        name: 'article-detail', 
        props: true,
        component: () => import('../views/ArticleDetail') 
      },
      { 
        path: 'newsList', 
        name: 'news-list', 
        component: () => import('../views/NewsList') 
      },
      { 
        path: 'heroList', 
        name: 'hero-list', 
        component: () => import('../views/HeroList') 
      },
      { 
        path: 'videoPlay/:id', 
        name: 'video-play', 
        props: true,
        component: () => import('../views/VideoPlay') 
      }      
    ]
  }

]

const router = new VueRouter({
  routes,
  // 路由改变时滚动到顶部，而返回上一级时滚动到之前位置
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 禁止相同路由跳转时打印错误信息
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export default router
