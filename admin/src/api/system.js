import request from '@/utils/request'

// 添加分类
export function saveCate (data) {
  return request({
    url: '/categories/add',
    method: 'post',
    data
  })
}

// 修改分类
export function updateCate (data) {
  return request({
    url: '/categories/update',
    method: 'put',
    data
  })
}

// 删除分类
export function deleteCate (params) {
  return request({
    url: '/categories/delete',
    method: 'delete',
    params
  })
}

// 查询一级分类
export function fetchCateOne (params) {
  return request({
    url: '/categories/levelOne',
    method: 'get',
    params
  })
}

// 查询二级分类
export function fetchCateTwo (params) {
  return request({
    url: '/categories/levelTwo',
    method: 'get',
    params
  })
}

// 查询要编辑的分类信息
export function fetchCateItem (params) {
  return request({
    url: '/categories/item',
    method: 'get',
    params
  })
}

// ----添加广告位----
export function saveAds (data) {
  return request({
    url: '/ads/add',
    method: 'post',
    data
  })
}

// 修改广告位
export function updateAds (data) {
  return request({
    url: '/ads/update',
    method: 'put',
    data
  })
}

// 删除广告位
export function deleteAds (params) {
  return request({
    url: '/ads/delete',
    method: 'delete',
    params
  })
}

// 获取广告位列表
export function fetchAds (params) {
  return request({
    url: '/ads/list',
    method: 'get',
    params
  })  
}

// 查询要编辑的广告位信息
export function fetchAdsItem (params) {
  return request({
    url: '/ads/item',
    method: 'get',
    params
  })
}

