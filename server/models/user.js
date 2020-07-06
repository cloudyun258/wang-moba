// goods 集合(表) 定义文件
const mongoose = require('./db')

const UserSchema = mongoose.Schema({
  username: { type: String },
  password: { type: String }
})

// 对应集合(表)为 tests
module.exports = mongoose.model('User', UserSchema)
