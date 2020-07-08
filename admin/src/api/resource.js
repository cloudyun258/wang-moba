import request from '@/utils/request'


// 新建文章
export function saveArticle (data) {
  return request({
    url: '/article/add',
    method: 'post',
    data
  })
}

// 删除文章
export function deleteArticle (params) {
  return request({
    url: '/article/delete',
    method: 'delete',
    params
  })
}

// 修改文章
export function updateArticle (data) {
  return request({
    url: '/article/update',
    method: 'put',
    data
  })
}

// 获取文章列表
export function fetchArticle (params) {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}

// 获取文章二级分类
export function fetchArticleTwo (params) {
  return request({
    url: '/article/cate',
    method: 'get',
    params
  })
}

// 获取文章详情
export function fetchArticleItem (params) {
  return request({
    url: '/article/item',
    method: 'get',
    params
  })
}

// 富文本编辑器文件上传
export function  uploadEditorFile(data) {
  return request({
    url: '/upload/images',
    method: 'post',
    data
  })
}