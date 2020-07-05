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

