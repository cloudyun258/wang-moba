// 路由规则
const handle = require('./handle')
const express = require('express')

// 创建路由对象
const router = express.Router()

// 注册路由规则
router.use(express.static('public'))
router.get('/test', handle.testHandle)


// 导出路由对象
module.exports = router
