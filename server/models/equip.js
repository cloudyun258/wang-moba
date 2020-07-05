// goods 集合(表) 定义文件
const mongoose = require('./db')

const EquipSchema = mongoose.Schema({
  name: { type: String },
  icon: { type: String }
})

// 对应集合(表)为 tests
module.exports = mongoose.model('Equip', EquipSchema)
