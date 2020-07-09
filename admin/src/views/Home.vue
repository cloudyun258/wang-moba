<template>
  <div id="home">
    WLECOME TO WANG-MOBA-ADMIN !
    <div class="myChart" :style="{width: '800px', height: '400px'}"></div>
  </div>
</template>

<script>
  import { fetchEcharts } from '@/api/home'
  export default {
    name: 'Home',
    data () {
      return {
        echartsData: []
      }
    },
    mounted () {
      this.fetchEcharts()
      this.drawEcharts()
    },
    watch: {
      echartsData () {
        this.drawEcharts()
      }
    },
    methods: {
      async fetchEcharts () {
        const res = await fetchEcharts()
        this.echartsData = res.data
      },
      drawEcharts () {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.querySelector('.myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: '后台数据一览' },
          tooltip: {},
          xAxis: {
              data: ['装备', '铭文', '文章', '视频', '英雄', '广告位', '管理员']
          },
          yAxis: {},
          series: [{
              name: '总数',
              type: 'bar',
              data: this.echartsData
          }]
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  #home 
    color: $colorI
    font-size: $font-xl
    font-weight: 700
    text-align: center
    margin-top: 50px
    letter-spacing: 6px
    .myChart
      margin: 0 auto
      margin-top: 180px 

</style>

