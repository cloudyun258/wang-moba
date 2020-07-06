import request from '@/utils/request'

// 登录
export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 验证身份
export function auth (data) {
  return request({
    url: '/auth',
    method: 'post',
    data
  })
}


// 添加管理员
export function saveUser (data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

// 删除管理员
export function deleteUser (params) {
  return request({
    url: '/user/delete',
    method: 'delete',
    params
  })
}


// 更新管理员
export function updateUser (data) {
  return request({
    url: '/user/update',
    method: 'put',
    data
  })
}

// 获取管理员
export function getUser (params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

// 获取管理员详情
export function fetchUserItem (params) {
  return request({
    url: '/user/item',
    method: 'get',
    params
  })
}
