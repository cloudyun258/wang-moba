// goods 集合(表) 定义文件
const mongoose = require('./db')

const UserSchema = mongoose.Schema({
  username: { type: String },
  password: { 
    type: String,
    // 查询数据时默认不把password字段带出来
    select: false,
    // 密码加密
    set (val) {
      return require('bcryptjs').hashSync(val, 10)
    }
  }
})


module.exports = mongoose.model('User', UserSchema)
