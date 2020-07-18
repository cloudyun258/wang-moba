// 路由处理函数

const mongoose = require('mongoose')
const AdModel = require('../models/ad')
const CategoryModel = require('../models/category')
const ArticleModel = require('../models/article')
const HeroModel = require('../models/hero')

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
  },

  // 文章列表
  async newsListTwoHandle (req, res) {
    // 获取前端传过来的参数
    let { newsType, page, pageSize } = req.query
    // 参数处理
    page = Number(page) ? Number(page) : 1
    pageSize = Number(pageSize) ? Number(pageSize) : 8
    const skip = (page - 1) * pageSize

    // 返回的新闻列表数据
    let newsList = []
    // 是否有下一页
    let hasNext  = true 

    if (newsType === '热门') {
      newsList = await ArticleModel.find().where({ hot: true })
      .populate('categories').skip(skip).limit(pageSize).lean()
      // 热门的新闻总数
      let newsTotal = await ArticleModel.find().where({ hot: true }).countDocuments()
      // 没有下一页
      if ((skip + newsList.length) >= newsTotal) {
        hasNext = false
      }
      // 给每篇文章添加categoryName字段
      newsList.forEach(news => {
        news.categoryName = news.categories[news.categories.length - 1].name
      })
    } else {
      // 先把对应分类信息查出来
      const category = await CategoryModel.findOne().where({ name: newsType })
      // 根据分类的id取查找对应文章
      newsList = await ArticleModel.find().where({
        categories: { $in: [category._id] }
      }).populate('categories').skip(skip).limit(pageSize).lean()

      // 当前分类的新闻总数
      let newsTotal = await ArticleModel.find().where({
        categories: { $in: [category._id] }
      }).countDocuments()
      // 没有下一页
      if ((skip + newsList.length) >= newsTotal) {
        hasNext = false
      }
      // 给每篇文章添加categoryName字段
      newsList.forEach(news => { news.categoryName = newsType })
    }
    response(res, 0, '获取新闻列表成功', { newsList, hasNext })
  },

  //首页英雄数据
  async HeroListOneHandle (req, res) {
    // 查询英雄二级分类，以及属于该分类下的所有英雄
    const catesData = await CategoryModel.aggregate([
      { $match: { parent: mongoose.Types.ObjectId('5ef9a67208fb182c3c173e77') } },
      {
        $lookup: {
          from: 'heros',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList'
        }
      },
    ])
    // 添加一个热门分类, 
    catesData.unshift({
      name: '热门',
      heroList: await HeroModel.find().where({ hot: true }).limit(10)
    })
    response(res, 0, '获取首页英雄数据成功', catesData)
  },

  // 英雄列表数据
  async HeroListTwoHandle (req, res) {
    let { heroType } = req.query
    // 返回的英雄数据
    let heroList = []

    if (heroType === '全部') {
      heroList = await HeroModel.find()
    } else {
      // 先把对应分类信息查出来
      const category = await CategoryModel.findOne().where({ name: heroType })
      // 根据分类的id取查找对应文章
      heroList = await HeroModel.find().where({
        categories: { $in: [category._id] }
      })
    }

    response(res, 0, '获取英雄列表成功', heroList)
  }

}