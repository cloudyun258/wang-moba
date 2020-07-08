// goods 集合(表) 定义文件
const mongoose = require('./db')

const ArticleSchema = mongoose.Schema({
  title: { type: String },
  body: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
  // 默认值是文章创建时间,存储的是时间戳
  date: { 
    type: String,
    default: +new Date()
  },
  hot: { 
    type: Boolean,
    default: false
  }
})


module.exports = mongoose.model('Article', ArticleSchema)
