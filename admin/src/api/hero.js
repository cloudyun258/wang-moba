import request from '@/utils/request'

// 添加英雄
export function saveHero (data) {
  return request({
    url: '/hero/add',
    method: 'post',
    data
  })
}

// 修改英雄
export function updateHero (data) {
  return request({
    url: '/hero/update',
    method: 'put',
    data
  })
}

// 删除英雄
export function deleteHero (params) {
  return request({
    url: '/hero/delete',
    method: 'delete',
    params
  })
}

// -----获取英雄二级分类-----
export function fetchHeroTwo (params) {
  return request({
    url: '/hero/cate',
    method: 'get',
    params
  })
}

// 获取英雄列表
export function getHero (params) {
  return request({
    url: '/hero/list',
    method: 'get',
    params
  })
}

// 获取要编辑的英雄信息
export function fetchHeroItem (params) {
  return request({
    url: '/hero/item',
    method: 'get',
    params
  })
}

