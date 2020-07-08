// goods 集合(表) 定义文件
const mongoose = require('./db')

const AdSchema = mongoose.Schema({
  name: { type: String },
  items: [{
    image: { type: String },
    url: { type: String }
  }]
})


module.exports = mongoose.model('Ad', AdSchema)
