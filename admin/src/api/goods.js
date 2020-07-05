import request from '@/utils/request'

// 添加装备
export function saveEquip (data) {
  return request({
    url: '/equip/add',
    method: 'post',
    data
  })
}

// 删除装备
export function deleteEquip (params) {
  return request({
    url: '/equip/delete',
    method: 'delete',
    params
  })
}


// 更新装备
export function updateEquip (data) {
  return request({
    url: '/equip/update',
    method: 'put',
    data
  })
}

// 获取装备
export function getEquip (params) {
  return request({
    url: '/equip/list',
    method: 'get',
    params
  })
}

// 获取装备详情
export function getEquipItem (params) {
  return request({
    url: '/equip/item',
    method: 'get',
    params
  })
}

// -----获取铭文二级分类-----
export function fetchStoreTwo (params) {
  return request({
    url: '/store/cate',
    method: 'get',
    params
  })
}

// 添加铭文
export function saveStore (data) {
  return request({
    url: '/store/add',
    method: 'post',
    data
  })
}

// 删除铭文
export function deleteStore (params) {
  return request({
    url: '/store/delete',
    method: 'delete',
    params
  })
}

// 更新铭文
export function updateStore (data) {
  return request({
    url: '/store/update',
    method: 'put',
    data
  })
}

// 获取铭文
export function getStore (params) {
  return request({
    url: '/store/list',
    method: 'get',
    params
  })
}

// 获取装备详情
export function fetchStoreItem (params) {
  return request({
    url: '/store/item',
    method: 'get',
    params
  })
}