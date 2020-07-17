
//返回的 min ~ max的随机整数, 包含min和max
function getRandom(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports =  getRandom