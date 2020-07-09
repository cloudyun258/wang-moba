import request from '@/utils/request'

// 获取用于echarts展示的数据
export function fetchEcharts (params) {
  return request({
    url: '/echarts',
    method: 'get',
    params
  })
}
