// error.js 用于优雅捕获 async /await 产生的异常
function awaitWrap (promise) {
  return promise
   .then(data => [null, data])
   .catch(err => [err, null])
}

module.exports =  awaitWrap