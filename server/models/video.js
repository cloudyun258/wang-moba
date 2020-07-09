// goods 集合(表) 定义文件
const mongoose = require('./db')

const VideoSchema = mongoose.Schema({
  title: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  // 默认值是文章创建时间,存储的是时间戳
  date: { 
    type: String,
    default: +new Date()
  },
  play: { type: String },
  cover: { type: String },
  video: { type: String }
})


module.exports = mongoose.model('Video', VideoSchema)
