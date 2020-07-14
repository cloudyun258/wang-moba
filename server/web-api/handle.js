// 路由处理函数
const AdModel = require('../models/ad')

const response = require('../utils/response')
const awaitWrap = require('../utils/error')

 // 这里写对应路由的处理函数
module.exports = {
  // 首页广告
  async homeAdsHandle (req, res) {
    const homeAds = await AdModel.findById('5f01cd39ccc2353e881d827a')
    response(res, 0, '获取首页广告数据成功', homeAds.items)
  }
}