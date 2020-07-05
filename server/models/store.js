// goods 集合(表) 定义文件
const mongoose = require('./db')

const StoreSchema = mongoose.Schema({
  name: { type: String },
  icon: { type: String },
  // 铭文属性
  attr: { type: Array },
  // 所属铭文分类, 关联Category模型, 分类是唯一的
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }

})

// 对应集合(表)为 tests
module.exports = mongoose.model('Store', StoreSchema)
