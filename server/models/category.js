// goods 集合(表) 定义文件
const mongoose = require('./db')

const CategorySchema = mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
})


module.exports = mongoose.model('Category', CategorySchema)
