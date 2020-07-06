// 路由处理函数
const CategoryModel = require('../models/category')
const EquipModel = require('../models/equip')
const StoreModel = require('../models/store')
const HeroModel = require('../models/hero')
const AdModel = require('../models/ad')
const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')
const bcrypt = require('bcryptjs')
const response = require('../utils/response')
const awaitWrap = require('../utils/error')

// 用于 生成token 和 解密token 的字符串
const SECRET = 'hdfgsdfgsdf2121sfdas'

module.exports = {

  // 验证token的中间件函数
  async auth (req, res, next) {
    // 获取请求头中的token
    const tokenStr = String(req.headers.authorization)
    // 解析token
    jwt.verify(tokenStr, SECRET, async (err, tokenRes) => {
      // token无效
      if (err) {
        response(res, 10, '当前未登录')
        return
      }
      req.tokenRes = tokenRes
      next()
    })
  },

  // 登录路由处理
  async loginHandle (req, res) {

    let username = req.body.username
    let password = req.body.password

    if (username !== 'admin' || password !== '123456') {
      response(res, 1, '用户名或密码错误')
      return
    }
    // 登陆成功, 生成token
    const token = jwt.sign({ 
      username: String(username)
    }, SECRET)
    // 返回token
    response(res, 0, '登录成功', { username }, token)
  },

  //登录验证
  async authHandle (req, res) {
    response(res, 0, '身份验证成功', { username: req.tokenRes.username } )
  },

  // 文件上传
  async uploadHandle (req, res) {
    let file = req.file
    // 上传的文件为空
    if (!file) {
      response(res, 1, '文件上传失败')
      return
    }
    // 给文件对象添加一个url字段
    file.url = `http://localhost:3007/admin/${file.pathUrl}/${file.filename}`
    response(res, 0, '文件上传成功', file)
  },

  // ----添加或更新分类----
  async cateEditHandle (req, res) {
    const { name, parent } = req.body
    // 查询参数
    let params = {}
    // 标记该分类是否已存在
    let isHave = false
    // 根据 parent的值判断添加的是一级分类还是二级分类
    if (!parent) {
      // 判断该一级分类是否已存在同名的
      let totalItem = await CategoryModel.find()
      totalItem.forEach(item => {
        if (item.name === name && !item.parent) {
          isHave = true
        }
      })
      // 一级分类已存在
      if (isHave) {
        response(res, 1, '该一级分类已存在')
        return
      }
      params = { name }
    } else {
       // 判断该二级分类是否已存在同名的
      const item  = await CategoryModel.find().where({ name, parent })
      isHave = item.length === 0 ? false : true
      if (isHave) {
        response(res, 1, '该二级分类已存在')
        return
      }
      params = { name, parent }
    }
    // 根据请求路径判断是添加还是更新
    let item, msg
    if (req.path.indexOf('add') != -1) {
      item = await CategoryModel.create(params)
      msg = '新建分类成功'
    } else {
      item  = await CategoryModel.findByIdAndUpdate(req.body.id, params)
      msg = '更新分类成功'
    }

    response(res, 0, msg, item)
  },

  // 删除分类
  async cateDeleteHandle (req, res) {
    // 获取要删除的id
    const id = req.query.id
    // 查询当前要删除的分类
    let item = await CategoryModel.findById(id)
    if (item.parent) {
      // 删除的是二级分类, 直接删除即可
      await CategoryModel.findByIdAndDelete(id)
    } else {
      // 删除的是一级分类, 需要把其下的所有二级分类也删除
      await CategoryModel.deleteMany({
        $or: [
          { _id: id }, 
          { parent: id }
        ]
      })
    }
    response(res, 0, '删除分类成功')
  },

  // 查询一级分类
  async levelOneHandle (req, res) {
    // 查询出所有分类
    let totalItem = await CategoryModel.find()
    // 过滤出一级分类
    let levelOne = totalItem.filter(item => !item.parent)
    response(res, 0, '获取一级分类成功', levelOne)
  },

  // 查询二级分类
  async levelTwoHandle (req, res) {
    // 获取一级分类id
    const id = req.query.id
     // 查询出所有分类
    let totalItem = await CategoryModel.find() 
    levelTwo = totalItem.filter(item => item.parent && String(item.parent) === id)
    response(res, 0, '获取二级分类成功', levelTwo)
  },

  // 获取分类详情
  async cateItemHandle (req, res) {
    // 获取分类id
    const id = req.query.id
    let item  = await CategoryModel.findById(id)
    response(res, 0, '获取分类详情成功', item)
  },

  // ----添加或修改装备----
  async equipEditHandle (req, res) {
    // 获取装备信息
    const  { name, icon, id } = req.body
    const isHave = await EquipModel.findOne({ name })
    // 如果是添加, 有同名的不允许添加
    if (isHave && !id) {
      response(res, 1, '该装备已存在')
      return
    }
    let item, msg
    if (id) {
      // 修改装备
      item = await EquipModel.findByIdAndUpdate(id, { name, icon })
      msg = '更新装备成功'
    } else {
      // 添加装备
      item = await EquipModel.create({ name, icon })
      msg = '新建装备成功'
    }
    response(res, 0, msg, item)
  },

  // 删除装备
  async equipDeleteHandle (req, res) {
    const id = req.query.id
    const item = await EquipModel.findByIdAndDelete(id)
    response(res, 0, '删除装备成功', item)
  },

  // 获取装备列表
  async equipListHandle (req, res) {
    // 获取第几页数据, 不传为第一页
    let page = Number(req.query.page) ? Number(req.query.page) : 1
    // 每页多少条数据, 不传获取5条
    let pageSize = Number(req.query.pageSize) ? Number(req.query.pageSize) : 5
    // 需要跳过的数据条数
    let skip = (page - 1) * pageSize
    // 数据库中装备总数
    const equipTotal = await EquipModel.find().countDocuments()
    const equipList = await EquipModel.find().skip(skip).limit(pageSize)
    response(res, 0, '获取装备列表成功',  { equipTotal, equipList })
  },

  // 装备详情
  async equipItemHandle (req, res) {
    const id = req.query.id
    const item = await EquipModel.findById(id)
    response(res, 0, '获取装备详情成功', item)
  },

  // -----获取铭文的二级分类-----
  async storeCateHandle(req, res) {
    // 找出铭文下的子分类
    const storeCate = await CategoryModel.find({ parent: "5efc70a4592c4a2f80a47f3f" })
    response(res, 0, '获取铭文二级分类成功', storeCate)
  },

  // 添加或修改铭文
  async storeEditHandle (req, res) {
    const  { name, icon, id, attr, category } = req.body
    const isHave = await StoreModel.findOne({ name })
    // 如果是添加, 有同名的不允许添加
    if (isHave && !id) {
      response(res, 1, '该铭文已存在')
      return
    }
    let item, msg
    if (id) {
      // 修改铭文
      item = await StoreModel.findByIdAndUpdate(id, { name, icon, attr, category })
      msg = '更新铭文成功'
    } else {
      // 添加铭文
      item = await StoreModel.create({ name, icon, attr, category })
      msg = '新建铭文成功'
    }
    response(res, 0, msg, item)
  },

  // 删除铭文
  async storeDeleteHandle (req, res) {
    const id = req.query.id
    const item = await StoreModel.findByIdAndDelete(id)
    response(res, 0, '删除铭文成功', item)
  },

  // 获取铭文详情
  async storeItemHandle (req, res) {
    const id  = req.query.id
    const [err, item] = await awaitWrap(StoreModel.findById(id))
    // 查询出错
    if (err) {
      response(res, 1, '获取铭文详情失败')
      return
    }
    response(res, 0, '获取铭文详情成功', item)
  },

  // 获取铭文列表
  async storeListHandle (req, res) {
    // 获取第几页数据, 不传为第一页
    let page = Number(req.query.page) ? Number(req.query.page) : 1
    // 每页多少条数据, 不传获取5条
    let pageSize = Number(req.query.pageSize) ? Number(req.query.pageSize) : 5
    // 需要跳过的数据条数
    let skip = (page - 1) * pageSize
    // 获取铭文总数量
    const storeTotal = await StoreModel.find().countDocuments()
    const storeList = await StoreModel.aggregate([
      {
        $lookup: {
          // 关联 categories表, 注意不是模型名category
          from: 'categories',
          // 主表关联的字段
          localField: 'category',
          // 被关联表要关联的字段
          foreignField: '_id',
          // 关联查询出来的放在 categoryInfo属性中
          as: 'categoryInfo'
        }
      },
      // 跳过条数
      { $skip: skip },
      { $limit: pageSize }
    ])
    response(res, 0, '获取铭文数据成功', { storeTotal, storeList })
  },

  // -----获取英雄二级分类 ---- 
  async heroCateHandle (req, res) {
    // 找出铭文下的子分类
    const heroCate = await CategoryModel.find({ parent: "5ef9a67208fb182c3c173e77" })
    response(res, 0, '获取英雄二级分类成功', heroCate)
  },

  // 添加或修改英雄
  async heroEditHandle (req, res) {
    const { id, heroItem } = req.body
    const isHave = await HeroModel.findOne({ name: heroItem.name })
    if (isHave && !id) {
      response(res, 1, '该英雄已存在')
      return
    }
    let item, msg
    if (id) {
      // 修改铭文
      item = await HeroModel.findByIdAndUpdate(id, heroItem)
      msg = '更新英雄成功'
    } else {
      // 添加铭文
      item = await HeroModel.create(heroItem)
      msg = '新建英雄成功'
    }
    response(res, 0, msg, item)
  },

  // 删除英雄
  async heroDeleteHandle (req, res) {
    const id = req.query.id
    const item = await HeroModel.findByIdAndDelete(id)
    response(res, 0, '删除英雄成功', item)    
  },

  // 获取英雄详情
  async heroItemHandle (req, res) {
    const id = req.query.id
    const item  = await HeroModel.findById(id)
    response(res, 0, '获取英雄详情成功', item)
  },

  // 获取英雄列表
  async heroListHandle (req, res) {
    // 获取第几页数据, 不传为第一页
    let page = Number(req.query.page) ? Number(req.query.page) : 1
    // 每页多少条数据, 不传获取5条
    let pageSize = Number(req.query.pageSize) ? Number(req.query.pageSize) : 5
    // 需要跳过的数据条数
    let skip = (page - 1) * pageSize

    // 构造查询对象
    let name = req.query.name
    let searchQuery = {}
    if (name) {
      searchQuery.name = new RegExp(name)  //  {  name: /xxxx/ }
    }

    // 获取当前查询英雄总数量
    const heroTotal = await HeroModel.find(searchQuery).countDocuments()
    const heroList = await HeroModel.aggregate([
      {
        $lookup: {
          // 关联 categories表, 注意不是模型名category
          from: 'categories',
          // 主表关联的字段
          localField: 'categories',
          // 被关联表要关联的字段
          foreignField: '_id',
          // 关联查询出来的放在 categoryInfo属性中
          as: 'categoryInfo'
        }
      },
      { $match: searchQuery },
      // 跳过条数
      { $skip: skip },
      { $limit: pageSize }
    ])
    response(res, 0, '获取英雄数据成功', { heroTotal, heroList })
  },

  // -----添加或修改广告位-----
  async adsEditHandle (req, res) {
    const { id, name, items } = req.body
    const isHave = await AdModel.findOne({ name })
    if (isHave && !id) {
      response(res, 1, '该广告位已存在')
      return
    }
    let item, msg
    if (id) {
      // 修改广告位
      item = await AdModel.findByIdAndUpdate(id, { name, items })
      msg = '更新广告位成功'
    } else {
      // 添加广告位
      item = await AdModel.create({ name, items })
      msg = '新建广告位成功'
    }
    response(res, 0, msg, item)    
  },

  // 获取广告位列表
  async adsListHandle (req, res) {
    const totalItem = await AdModel.find()
    response(res, 0, '获取广告位列表成功', totalItem)
  },

  // 删除广告位
  async adsDeleteHandle (req, res) {
    const id = req.query.id
    const item = await AdModel.findByIdAndDelete(id)
    response(res, 0, '删除广告位成功', item)        
  },

  // 获取广告位详情
  async adsItemHandle (req, res) {
    const id  = req.query.id
    const [err, item] = await awaitWrap(AdModel.findById(id))
    // 查询出错
    if (err) {
      response(res, 1, '获取广告位详情失败')
      return
    }
    response(res, 0, '获取广告位详情成功', item)    
  },

  // ----- 添加或修改管理员 -----
  async userEditHandle (req, res) {
    // 获取管理员信息
    const  { username, password, id } = req.body
    const isHave = await UserModel.findOne({ username })
    // 如果是添加, 有同名的不允许添加
    if (isHave && !id) {
      response(res, 1, '该管理员已存在')
      return
    }
    let item, msg
    if (id) {
      // 验证密码
      const isUser = await UserModel.findById(id).select('+password')
      const isPassword = bcrypt.compareSync(password, isUser.password)
      // 密码无效
      if (!isPassword) {
        response(res, 1, '密码错误')
        return
      }
      // 密码正确才允许修改管理员
      item = await  UserModel.findByIdAndUpdate(id, { username, password })
      msg = '更新管理员成功'
    } else {
      // 添加管理员
      item = await  UserModel.create({ username, password })
      msg = '新建管理员成功'
    }
    response(res, 0, msg, item)    
  },

  // 删除管理员
  async userDeleteHandle (req, res) {
    const id = req.query.id
    const item = await UserModel.findByIdAndDelete(id)
    response(res, 0, '删除管理员成功', item)          
  },
  
  // 获取管理员列表
  async userListHandle (req, res) {
    const totalItem = await UserModel.find()
    response(res, 0, '获取管理员列表成功', totalItem)    
  },

  // 获取管理员详情
  async userItemHandle (req, res) {
    const id  = req.query.id
    const [err, item] = await awaitWrap(UserModel.findById(id))
    // 查询出错
    if (err) {
      response(res, 1, '获取管理员详情失败')
      return
    }
    response(res, 0, '获取管理员详情成功', item)        
  }

}