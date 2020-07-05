import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function auth (data) {
  return request({
    url: '/auth',
    method: 'post',
    data
  })
}
