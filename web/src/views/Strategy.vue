<template>
  <div id="strategy">
    <div class="ads-wrap">
      <swiper ref="adsSwiper" :options="swiperOptions">
        <swiper-slide v-for="(item, index) in strategyAds" :key="index">
          <a :href="item.url"><img width="100%" style="display:block" :src="item.image" alt="ads"></a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- end of ads -->
    <div class="rank-wrap">
      <div class="rank-header">
        <i class="icon"></i>
        <div class="title">热门视频</div>
        <div class="cates">
          <span class="cate cate-day" :class="{'active': active == 0}" @click="toggleNav(0)">日</span>
          <span class="cate cate-week" :class="{'active': active == 1}" @click="toggleNav(1)">周</span>
          <span class="cate cate-month" :class="{'active': active == 2}" @click="toggleNav(2)">月</span>
        </div>
      </div>
      <div class="rank-body">
        <swiper ref="mySwiper" :options="options">
          <swiper-slide v-for="(item, index) in videoRank" :key="index">
            <div class="video" :class="{'down': foldRank}">
              <div class="video-item video-item-1" @click="videoPlay(item.videoList[0])">
                <div class="cover">
                  <img :src="item.videoList[0].cover" class="cover-img" alt="cover">
                </div>
                <div class="info">
                  <div class="title">{{ "1. " + item.videoList[0].title }}</div>
                  <div class="other">
                    <div class="play-wrap">
                      <img src="../assets/images/video-fre.png" class="play-img" alt="play">
                      <span class="play">{{ item.videoList[0].play }}</span>
                    </div>
                    <div class="date-wrap">
                      <img src="../assets/images/icon/time.jpg" class="time-img" alt="time">
                      <span class="play-wrap">{{ item.videoList[0].date | formatDate('hh:mm') }}</span>                      
                    </div>
                  </div>
                </div>                
              </div>
              <!-- end of item-1 -->
              <div class="video-item video-item-2" 
                v-for="(video, i) in item.videoList.slice(1, item.videoList.length)"
                 @click="videoPlay(video)"
                :key="i">
                <div class="title text-ellipsis">{{ i + 2 + ". " + video.title }}</div>
                <div class="play-wrap">
                  <img src="../assets/images/video-fre.png" class="play-img" alt="play">
                  <span class="play">{{ video.play }}</span>
                </div>
              </div>
            </div>
            <div class="rank-more" @click=" foldRank=!foldRank">
              {{ foldRank ? '查看完整榜单' : '收起榜单' }}
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- end of rank -->
  </div>
</template>

<script>
  import { fetchStrategyAds, fetchVideoRank } from '@/api/index'
  export default {
    name: 'Strategy',
    data () {
      return {
        strategyAds: [],
        videoRank: [],
        active: 0,
        foldRank: true, // 控制视频排行榜的折叠
        swiperOptions: {
          // 小圆点
          pagination: {
            el: '.swiper-pagination'
          },
          // 滑动时间
          speed: 700,
          // 自动播放
          autoplay: {
            delay: 3000,
            // 用户手动操作完继续自动播放, false为继续播放
            disableOnInteraction: false
          },
          // 循环播放
          loop: true                    
        },
        options: {
          // 每个swiper项高度自动撑开
          autoHeight: true,
          on: {
            // swiper从当前slide开始过渡到另一个slide时执行
            slideChangeTransitionStart: () => {
              let swiper = this.$refs.mySwiper.$swiper
              let activeIndex = swiper.activeIndex
              this.active = activeIndex
              this.foldRank = true
            }
          }
        }     
      }
    },
    mounted () {
      this.fetchStrategyAds()
      this.fetchVideoRank()
    },
    methods: {
      // 获取策略中心轮播图数据
      async fetchStrategyAds () {
        const res = await fetchStrategyAds()
        this.strategyAds = res.data
      },
      // 获取视频排行榜数据
      async fetchVideoRank () {
        const res = await fetchVideoRank()
        this.videoRank = res.data
      },
       // 导航切换
      toggleNav (index) {
        this.active = index
        this.foldRank = true
        this.$refs.mySwiper.$swiper.slideTo(index, 300, false)
      },
      // 跳转到视频播放页
      videoPlay (item) {
        // 保存视频数据到本地
        localStorage.setItem('video', JSON.stringify(item))
        this.$router.push('/videoPlay')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  #strategy
    .rank-wrap
      background-color: $white
      margin-top: 1rem
      padding: 0 1.2rem
      .rank-header
        padding: 1.5rem 0
        flex-align(flex-start)
        height: 2rem
        line-height:2rem 
        border-bottom()
        .icon
          bg-img(2rem, 2rem, '../assets/images/video-fre.png', 1.6rem, auto, left, center)
        .title
          font-size: $font-l
          font-weight: 700 
          margin-left: 0.5rem
          flex: 1
          color: $dark-21 
        .cates
          background-color: $white
          .cate
            position: relative
            display: inline-block
            height: 2.3rem
            line-height: 2.3rem 
            margin-left: 1.6rem
            font-size: $font-sm
            color: $dark-34
            &:after
              content: ''
              pos-base(absolute, 0, auto, 100%, 0.23rem, auto, 0)
              background-color: transparent
            &.active
              color: $orange 
            &.active:after
              background-color: $orange  
    .rank-body
      .swiper-slide 
        margin-right: 0.1rem
      .video
        &.down
          height: 16.6rem
          overflow: hidden
        .video-item
          padding: 1rem 0
          border-bottom($grey-e6)
          .title
              font-size: $font-sm
              color: $dark-34
          .play-wrap, .date-wrap
            font-size: $font-xxs
            color: $grey-7a
            margin-right: 0.3rem 
          .play-img, .time-img
            height: 1rem
            margin-right: 0.3rem
            vertical-align: middle 
        .video-item-2
          flex-align(space-between, flex-start)
          .title
            flex: 1
          .play-wrap
            margin-left: 1rem 
            margin-right: 0
        .video-item-1
          flex-align(flex-start, flex-start)
          .cover
            position: relative
            margin-right: 1.5rem 
            .cover-img
              display: block
              width: 11.6rem
          .info
            flex: 1 
            .title
              height: 4rem
              line-height: 1.6em 
              text-ellipsis(2) 
              margin-bottom: 1.2rem 
            .other
              flex-align(flex-start, flex-start)
      .rank-more
        height: 3.4rem
        line-height: 3.4rem
        text-align: center
        color: $grey-7a
        background-color: #fff

</style>
