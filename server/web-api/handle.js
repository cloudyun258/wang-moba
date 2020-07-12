// 路由处理函数
const AdModel = require('../models/ad')

const response = require('../utils/response')
const awaitWrap = require('../utils/error')

 // 这里写对应路由的处理函数
module.exports = {
  async testHandle (req, res) {
    response(res, 0, '测试....')
  }
}