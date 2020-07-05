// db.js用于连接数据库
const mongoose = require('mongoose')

/* 解决以下警告： DeprecationWarning: 
Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` 
without the `useFindAndModify` option set to false are deprecated. 

原因是因为:`findOneAndUpdate()` and `findOneAndDelete()` 
等内部会使用findAndModify驱动，驱动即将被废弃，所以弹出警告！*/
mongoose.set('useFindAndModify', false)

const DBNAME = 'wang-moba'

// 2.连接数据库
mongoose.connect(`mongodb://localhost:27017/${DBNAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // 使用 unique 或者 索引 时要加
  useCreateIndex: true
})

mongoose.connection.on('error', () => { console.log('数据库连接失败la~') })

mongoose.connection.once('open', () => { console.log('数据库连接成功da~') })

//将 mongoose 导出
module.exports = mongoose