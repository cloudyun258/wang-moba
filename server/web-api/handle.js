// 路由处理函数
//const testModel = require('../models/test')
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')

 // 这里写对应路由的处理函数
module.exports = {
  async testHandle (req, res, next) {
    res.json({
      status: 0,
      msg: 'hello web-api',
      data: []
    })
  }
}