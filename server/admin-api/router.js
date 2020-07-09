// 路由规则
const handle = require('./handle')
const express = require('express')
const path = require('path')
const handleMulter = require('../utils/multer')

const upload = handleMulter()
// 创建路由对象
const router = express.Router()

// 托管静态文件
router.use('/upload/images', express.static(path.join(__dirname, '../upload/images')))
router.use('/upload/video', express.static(path.join(__dirname, '../upload/video')))


// 注册路由规则
router.post('/auth', handle.auth, handle.authHandle)
router.post('/login', handle.loginHandle)

// 文件上传
router.post('/upload/:type', handle.auth, upload.single('file'), handle.uploadHandle)
// 分类
router.post('/categories/add', handle.auth, handle.cateEditHandle)
router.delete('/categories/delete', handle.auth, handle.cateDeleteHandle)
router.put('/categories/update', handle.auth, handle.cateEditHandle)
router.get('/categories/levelOne', handle.auth, handle.levelOneHandle)
router.get('/categories/levelTwo', handle.auth, handle.levelTwoHandle)
router.get('/categories/item', handle.auth, handle.cateItemHandle)
// 装备
router.post('/equip/add', handle.auth, handle.equipEditHandle)
router.delete('/equip/delete', handle.auth, handle.equipDeleteHandle)
router.put('/equip/update', handle.auth, handle.equipEditHandle)
router.get('/equip/list', handle.auth, handle.equipListHandle)
router.get('/equip/item', handle.auth, handle.equipItemHandle)
// 铭文
router.post('/store/add', handle.auth, handle.storeEditHandle)
router.delete('/store/delete', handle.auth, handle.storeDeleteHandle)
router.put('/store/update', handle.auth, handle.storeEditHandle)
router.get('/store/list', handle.auth, handle.storeListHandle)
router.get('/store/item', handle.auth, handle.storeItemHandle)
router.get('/store/cate', handle.auth, handle.storeCateHandle)
// 英雄
router.post('/hero/add', handle.auth, handle.heroEditHandle)
router.delete('/hero/delete', handle.auth, handle.heroDeleteHandle)
router.put('/hero/update', handle.auth, handle.heroEditHandle)
router.get('/hero/list', handle.auth, handle.heroListHandle)
router.get('/hero/item', handle.auth, handle.heroItemHandle)
router.get('/hero/cate', handle.auth, handle.heroCateHandle)
// 广告位
router.post('/ads/add', handle.auth, handle.adsEditHandle)
router.delete('/ads/delete', handle.auth, handle.adsDeleteHandle)
router.put('/ads/update', handle.auth, handle.adsEditHandle)
router.get('/ads/list', handle.auth, handle.adsListHandle)
router.get('/ads/item', handle.auth, handle.adsItemHandle)
// 管理员
router.post('/user/add', handle.auth, handle.userEditHandle)
router.delete('/user/delete', handle.auth, handle.userDeleteHandle)
router.put('/user/update', handle.auth, handle.userEditHandle)
router.get('/user/list', handle.auth, handle.userListHandle)
router.get('/user/item', handle.auth, handle.userItemHandle)
// 文章
router.post('/article/add', handle.auth, handle.articleEditHandle)
router.delete('/article/delete', handle.auth, handle.articleDeleteHandle)
router.put('/article/update', handle.auth, handle.articleEditHandle)
router.get('/article/cate', handle.auth, handle.articleCateHandle)
router.get('/article/list', handle.auth, handle.articleListHandle)
router.get('/article/item', handle.auth, handle.articleItemHandle)
// 视频
router.post('/video/add', handle.auth, handle.videoEditHandle)
router.delete('/video/delete', handle.auth, handle.videoDeleteHandle)
router.put('/video/update', handle.auth, handle.videoEditHandle)
router.get('/video/cate', handle.auth, handle.videoCateHandle)
router.get('/video/list', handle.auth, handle.videoListHandle)
router.get('/video/item', handle.auth, handle.videoItemHandle)
// 数据可视化
router.get('/echarts', handle.auth, handle.echartsHandle)

// 导出路由对象
module.exports = router