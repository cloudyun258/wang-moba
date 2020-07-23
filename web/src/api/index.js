import request from '@/utils/request'

// 首页轮播广告
export function fetchHomeAds (params) {
  return request({
    url: '/ads/home',
    method: 'get',
    params
  })
}

// 首页新闻数据
export function fetchNewsListOne (params) {
  return request({
    url: '/news/listOne',
    method: 'get',
    params
  })
}

// 新闻列表数据
export function fetchNewsListTwo (params) {
  return request({
    url: '/news/listTwo',
    method: 'get',
    params
  })
}

// 文章详情
export function fetchArticle (params) {
  return request({
    url: '/article/item',
    method: 'get',
    params
  })
}

// 首页英雄数据
export function fetchHeroListOne (params) {
  return request({
    url: '/hero/listOne',
    method: 'get',
    params
  })
}

// 首页英雄数据
export function fetchHeroCate (params) {
  return request({
    url: '/hero/cate',
    method: 'get',
    params
  })
}

// 英雄列表数据
export function fetchHeroListTwo (params) {
  return request({
    url: '/hero/listTwo',
    method: 'get',
    params
  })
}

// 英雄详情
export function fetchHero (params) {
  return request({
    url: '/hero/item',
    method: 'get',
    params
  })
}

// 首页视频数据
export function fetchVideoListOne (params) {
  return request({
    url: '/video/listOne',
    method: 'get',
    params
  })
}

// 获取赛事中心的二级分类
export function fetchMatchCate (params) {
  return request({
    url: '/match/cate',
    method: 'get',
    params
  })
}

// 获取赛事中心的文章
export function fetchMatchArticle (params) {
  return request({
    url: '/match/article',
    method: 'get',
    params
  })
}

// 策略中心轮播广告
export function fetchStrategyAds (params) {
  return request({
    url: '/strategy/home',
    method: 'get',
    params
  })
}

// 策略中心视频排行榜
export function fetchVideoRank (params) {
  return request({
    url: '/video/rank',
    method: 'get',
    params
  })
}

