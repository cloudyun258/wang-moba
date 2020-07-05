// 数据响应函数
function response(res, status, msg, data = {}, token) {
  if (token) {
    res.json({ status, msg, token, data})
  } else {
    res.json({ status, msg, data })
  }
}

module.exports = response
