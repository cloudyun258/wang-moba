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
// 新闻列表
router.get('/news/listTwo', handle.newsListTwoHandle)
// 首页英雄数据
router.get('/hero/listOne', handle.heroListOneHandle)
// 英雄详情
router.get('/hero/item', handle.heroItemHandle)
// 英雄列表
router.get('/hero/listTwo', handle.heroListTwoHandle)
// 首页视频数据
router.get('/video/listOne', handle.videoListOneHandle)



// 导出路由对象
module.exports = router
