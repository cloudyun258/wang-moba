// 路由处理函数

const mongoose = require('mongoose')
const AdModel = require('../models/ad')
const CategoryModel = require('../models/category')
const ArticleModel = require('../models/article')

const response = require('../utils/response')
const random = require('../utils/random')
const awaitWrap = require('../utils/error')

 // 这里写对应路由的处理函数
module.exports = {
  // 首页广告
  async homeAdsHandle (req, res) {
    const homeAds = await AdModel.findById('5f01cd39ccc2353e881d827a')
    response(res, 0, '获取首页广告数据成功', homeAds.items)
  },
  // 首页新闻数据
  async newsListOneHandle (req, res) {
    // 查询新闻二级分类，以及属于该分类下的所有文章, 每个二级分类取前5篇文章
    const catesData = await CategoryModel.aggregate([
      { $match: { parent: mongoose.Types.ObjectId('5efae758b9cea00ae86dd276') } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      }, 
      // $addFields 本意是添加字段，这里用来修改 newslist字段，用于取每个二级分类下的前5篇文章
      {
        $addFields: { 
          // $newsList 表示关联查出来的 newsList, $slice表示切割
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])
    // 添加一个热门分类, 
    catesData.unshift({
      name: '热门',
      newsList: await ArticleModel.find().where({ hot: true })
      .populate('categories').limit(5).lean()
    })
    // 给每篇文章添加一个 categoryName 字段, 热门分类就取最后一个分类的名字
    catesData.forEach(cate => {
      cate.newsList.forEach(news => {
        news.categoryName = cate.name === '热门' ? 
        news.categories[news.categories.length - 1].name : cate.name
      })
    })

    response(res, 0, '获取首页新闻数据成功', catesData)
  },
  // 文章详情
  async articleItemHandle (req, res) {
    const item = await ArticleModel.findById(req.query.id).lean()
    // 先把相关文章都查出来
    const related = await ArticleModel.find().where({
      categories: { $in: item.categories },
      _id: { $nin: [req.query.id] }
    })
    // 随机插入两篇相关文章
    item.related = []
    let r1 = random(0, related.length - 1)
    let r2 = random(0, related.length - 1)
    if (r1 == r2 == related.length - 1) {
      r2 = r2 - 1
    }
    if (r1 == r2 && r1 < related.length - 1) {
      r2 = r2 + 1
    }
    item.related.push(related[r1])
    item.related.push(related[r2])
    response(res, 0, '获取文章详情成功', item)
  }
}