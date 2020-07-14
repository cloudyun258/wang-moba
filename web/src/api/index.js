import request from '@/utils/request'

// 首页轮播广告
export function fetchHomeAds (params) {
  return request({
    url: '/ads/home',
    method: 'get',
    params
  })
}