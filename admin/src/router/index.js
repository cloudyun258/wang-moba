import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import { hasToken } from '../utils/auth'


Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: { title: '登录' }
  },

  {
    path: '*',
    name: '404',
    component: () => import('@/views/404'),
    meta: { title: '404' }
  },

  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: { title: '首页' }
      }
    ]
  },

  {
    path: '/goods',
    component: () => import('@/views/Layout'),
    redirect: '/goods/equipAdd',
    name: 'goods',
    meta: { title: '物品管理' },
    children: [
      {
        path: 'equipAdd',
        name: 'equip-add',
        component: () => import('@/views/goods/EquipEdit'),
        meta: { title: '新建装备' }
      }, 
      {
        path: 'equipList',
        name: 'equip-list',
        component: () => import('@/views/goods/EquipList'),
        meta: { title: '装备列表' }
      }, 
      {
        path: 'equipUpdate/:id',
        name: 'equip-update',
        props: true,
        component: () => import('@/views/goods/EquipEdit'),
        meta: { title: '编辑装备' }
      },

      {
        path: 'storeAdd',
        name: 'store-add',
        component: () => import('@/views/goods/StoreEdit'),
        meta: { title: '新建铭文' }
      }, 
      {
        path: 'storeList',
        name: 'store-list',
        component: () => import('@/views/goods/StoreList'),
        meta: { title: '铭文列表' }
      }, 
      {
        path: 'storeUpdate/:id',
        name: 'store-update',
        props: true,
        component: () => import('@/views/goods/StoreEdit'),
        meta: { title: '编辑铭文' }
      }
    ]
  },

  {
    path: '/hero',
    component: () => import('@/views/Layout'),
    redirect: '/hero/heroAdd',
    name: 'hero',
    meta: { title: '英雄管理' },
    children: [
      {
        path: 'heroAdd',
        name: 'hero-add',
        component: () => import('@/views/hero/HeroEdit'),
        meta: { title: '新建英雄' }
      }, 
      {
        path: 'heroList',
        name: 'hero-list',
        component: () => import('@/views/hero/HeroList'),
        meta: { title: '英雄列表' }
      }, 
      {
        path: 'heroUpdate/:id',
        name: 'hero-update',
        props: true,
        component: () => import('@/views/hero/HeroEdit'),
        meta: { title: '编辑英雄' }
      }
    ]
  },

  {
    path: '/system',
    component: () => import('@/views/Layout'),
    redirect: '/system/cateAdd',
    name: 'system',
    meta: { title: '系统设置' },
    children: [
      {
        path: 'cateAdd',
        name: 'cate-add',
        component: () => import('@/views/system/CateEdit'),
        meta: { title: '新建分类' }
      }, 
      {
        path: 'cateList',
        name: 'cate-list',
        component: () => import('@/views/system/CateList'),
        meta: { title: '分类列表' }
      },
      {
        path: 'cateUpdate/:id',
        name: 'cate-update',
        props: true,
        component: () => import('@/views/system/CateEdit'),
        meta: { title: '编辑分类' }
      },

      {
        path: 'adsAdd',
        name: 'ads-add',
        component: () => import('@/views/system/AdsEdit'),
        meta: { title: '新建广告位' }
      }, 
      {
        path: 'adsList',
        name: 'ads-list',
        component: () => import('@/views/system/AdsList'),
        meta: { title: '广告位列表' }
      },
      {
        path: 'adsUpdate/:id',
        name: 'ads-update',
        props: true,
        component: () => import('@/views/system/AdsEdit'),
        meta: { title: '编辑广告位' }
      },

      {
        path: 'userAdd',
        name: 'user-add',
        component: () => import('@/views/system/UserEdit'),
        meta: { title: '新建管理员' }
      }, 
      {
        path: 'userList',
        name: 'user-list',
        component: () => import('@/views/system/UserList'),
        meta: { title: '管理员列表' }
      },
      {
        path: 'userUpdate/:id',
        name: 'user-update',
        props: true,
        component: () => import('@/views/system/UserEdit'),
        meta: { title: '编辑管理员' }
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  // 启动加载条
  NProgress.start()
  // 动态设置标题
  document.title = to.meta.title ? to.meta.title : 'cy-admin'
  
  // 验证token是否有效
  const token = await hasToken()

  if (token) {
    // token有效
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    // token无效
    if ('/login'.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

// 禁止相同路由跳转时打印错误信息
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
