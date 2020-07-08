// goods 集合(表) 定义文件
const mongoose = require('./db')

const EquipSchema = mongoose.Schema({
  name: { type: String },
  icon: { type: String }
})


module.exports = mongoose.model('Equip', EquipSchema)
