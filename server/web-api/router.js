// 路由规则
const handle = require('./handle')
const express = require('express')

// 创建路由对象
const router = express.Router()

// 注册路由规则
router.use(express.static('public'))

// 首页轮播图
router.get('/ads/home', handle.homeAdsHandle)
// 首页新闻数据
router.get('/news/listOne', handle.newsListOneHandle)
// 文章详情
router.get('/article/item', handle.articleItemHandle)


// 导出路由对象
module.exports = router
