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
    <div class="rank-card">
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
    <div class="hero-card">
      <div class="hero-header">
        <i class="icon"></i>
        <div class="title">英雄攻略</div>
      </div>
      <div class="hero-body">
        <div class="hot-wrap" v-if="heroList.length">
          <div class="hot-item hot-noselect"
           v-for="(item, index) in heroList[0].heroList.slice(0, 5)" 
           :key="index">
            <img :src="item.avatar" class="hot" alt="avatar">
          </div>
          <div class="hot-item hot-select radius-medium">
            <img :src="hotSelect.avatar" class="select" alt="avatar">
          </div>
          <div class="hot-item hot-fold" @click="foldDrop=!foldDrop">展开</div>
        </div>
        <div class="hot-desc">
          <div class="basic-desc" v-if="hotSelect.categories">
            <span class="name">{{ hotSelect.name }}</span>
            <span class="cate">{{ hotSelect.categories[0].name }}</span>
            登场排名
            <span class="pickrank">4</span>
            胜率排名
            <span class="winrank">62</span>
          </div>
          <router-link tag="div" :to="`/hero/detail/${hotSelect._id}`" class="detail-link">
            查看英雄详细介绍 &gt;
          </router-link>
        </div>
        <div class="hot-video-1">
          <div class="video-1-item" 
            v-for="(item, index) in heroVideo.slice(0, 2)" :key="index"
            @click="videoPlay(item)">
              <div class="cover">
                <img :src="item.cover" class="cover-img" alt="cover">
                <img src="../assets/images/video-img.png" class="play-img" alt="play-img">
              </div>
              <div class="title">{{ item.title }}</div>
              <div class="play">
                <img src="../assets/images/video-fre.png" class="play-icon" alt="play-img">
                <span class="play-txt">{{ item.play }}</span>
              </div>             
          </div>
        </div>
        <div class="hot-video-2">
          <div class="video-2-item"
            v-for="(item, index) in heroVideo.slice(2, 4)" :key="index"
            @click="videoPlay(item)">
            <div class="cover">
              <img :src="item.cover" class="cover-img" alt="cover">
            </div>
            <div class="info">
              <div class="t1">{{ item.title }}</div>
              <div class="t2 text-ellipsis">{{ item.title }}</div>
              <div class="date">
                {{ item.date.split('T')[0] + " " + item.date.split('T')[1].split('.')[0]}}
              </div>
            </div>
          </div>
        </div>
        <router-link tag="div" :to="`/hero/detail/${hotSelect._id}`" class="hot-more">
          加载更多<span>"{{ hotSelect.name }}"</span>攻略内容
        </router-link>
        <div class="hero-dropdown" v-if="!foldDrop">
          <div class="dropdown-left">
            <div class="hero">
              <div class="hero-item" @click="selectHotHero(item)" v-for="(item, index) in dropHeroCate" :key="index">
                <div class="hero-avatar">
                  <img :src="item.avatar" class="avatar" alt="avatar">
                </div>
                <div class="hero-name">{{ item.name }}</div>
              </div>
            </div>
          </div>
          <div class="dropdown-right">
            <ul class="nav">
              <li class="nav-item"
                :class="{'active-cate': activeHeroCate == index}"
                v-for="(item, index) in heroList"
                @click="toggleHeroCate(index)"
                :key="index">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- end of body -->
    </div>
    <!-- end of hero-card -->
  </div>
</template>

<script>
  import { fetchStrategyAds, fetchVideoRank, 
        fetchHeroListOne, fetchHero } from '@/api/index'
  export default {
    name: 'Strategy',
    data () {
      return {
        strategyAds: [], // 广告数据
        videoRank: [], // 视频排行数据
        heroList: [],  // 英雄数据
        hotSelect: {}, // 英雄攻略中选中的英雄
        sunVideo: [],
        xiaoVideo: [],
        heroVideo: [],
        active: 0,  // 当前选中的视频排行类型
        activeHeroCate: 0,  // 下拉列表中选中的英雄类型
        dropHeroCate: [], 
        foldDrop: true,   // 控制英雄列表的折叠
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
      this.fetchHeroListOne()
    },
    methods: {
      // 获取英雄详情
      async fetchHero (id) {
        const res = await fetchHero({ id })
        this.hotSelect = res.data
        this.dropHeroCate = this.heroList[this.activeHeroCate].heroList
      },      
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
      // 获取英雄数据
      async fetchHeroListOne () {
        const res = await fetchHeroListOne()
        this.heroList = res.data
        this.fetchHero(res.data[0].heroList[5]._id)
        res.data[0].heroList.forEach((item, index) => {
          if (item.name == '孙尚香') {
            this.sunVideo = item.strategies
          }
          if (item.name == '小乔') {
            this.xiaoVideo = item.strategies
          }
        })
        this.heroVideo = this.sunVideo
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
      },
      // 切换英雄分类
      toggleHeroCate (index) {
        this.activeHeroCate = index
        this.dropHeroCate = this.heroList[this.activeHeroCate].heroList
      },
      // 英雄选择
      selectHotHero (hero) {
        this.hotSelect = hero
        this.heroVideo = this.heroVideo == this.sunVideo ? this.xiaoVideo :this.sunVideo
        this.foldDrop = true
        this.fetchHero(hero._id)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  #strategy
    .rank-card, .hero-card
      background-color: $white
      margin-top: 1rem
      padding: 0 1.2rem
      .rank-header, .hero-header
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
    .hero-header
      .icon
        background-image: url("../assets/images/icon/tag_hero.jpg") !important 
    .hero-body
      position: relative
      .hot-wrap
        padding: 1rem 0
        flex-align()
        .hot, .select
          display: block
          width: 4rem
        .hot-select
          border: 2px solid $orange
          .select
            width: 3.6rem
        .hot-noselect
          position:relative
          &:after
            content: '热门'
            font-size: $font-xxs 
            color: $white-fe
            text-align: center
            line-height: 1.3rem 
            background-color: rgba(0,0,0, 0.5) 
            pos-base(absolute, 0, auto, 100%, 1.3rem, auto, 0)          
        .hot-fold
          width: 4rem
          height: 4rem
          line-height: 4rem 
          text-align: center
          background-color: $white-f5
          color: $dark-39 
          font-size: $font-xxs
          border-all()     
      .hot-desc
        background-color: $white-f4
        font-size: $font-xxs
        flex-align() 
        margin: 0 -1.2rem
        padding: 0 1.2rem
        height: 2.3rem
        line-height: 2.3rem
        span
          position: relative
          padding: 0 0.5rem 0 0.3rem
          margin-right: 0.3rem 
          &:after
            content: ''
            pos-base(absolute,auto, 0, 1px, 100%, 0, auto) 
            background-color: $grey-aa
            transform: scaleX(.5) 
        .winrank:after
          width: 0
      .hot-video-1
        flex-align()
        padding-top: 1.5rem
        padding-bottom: 1rem
        border-bottom()
        .video-1-item
          flex: 1
          &:first-child
            margin-right: 0.7rem
          .cover
            position: relative
            &:after
              content: '143秒'
              pos-base(absolute, auto, auto, auto, 1.5rem, 0, 0)
              background-color: rgba(0,0,0,0.8)
              font-size: $font-xxs 
              color: $white-fe
              text-align: center
              line-height: 1.5rem 
              padding: 0.1rem 0.3rem 
            .cover-img
              width: 100%
              display: block
            .play-img
              pos-base(absolute, 50%, 50%, 3.2rem, auto)
              transform: translate3d(-50%, -50%, 0)
          .title
            font-size: $font-sm
            color: $dark-34
            height: 3.6rem
            text-ellipsis(2) 
            margin: 1rem 0 0.2rem
          .play
            font-size: $font-xxs
            color: $grey-7a
            .play-icon
              width: 1.2rem
              height: 0.9rem
              margin-right: 0.5rem  
              vertical-align: middle
      .hot-video-2
        .video-2-item
          flex-align(flex-start, flex-start)
          padding: 1.2rem 0
          border-bottom()
          .cover
            margin-right: 1.5rem
            .cover-img
              display: block
              width: 116px
          .info
            flex: 1
            overflow: hidden
            .t1
              color: $dark-34
              font-size: $font-m
              height: 20px
              line-height: 20px
              overflow: hidden
            .t2
              color: $grey-7a
              margin-bottom: 1rem
              padding-top: 0.5rem
            .date
              font-size: $font-xxs 
              color: $grey-7a
      .hot-more
        height: 3.4rem
        line-height: 3.4rem
        text-align: center
        color: $grey-7a
        background-color: #fff
        span
          color: $orange-d5
    .hero-dropdown
      left: 0
      top: 6rem
      background-color: $white
      flex-align(flex-start, flex-start) 
      border: 1px solid $grey-d4
      margin: 0 -0.1rem
      position: absolute
      height: 29.4rem
      width: 100%
      z-index: 999  
      .dropdown-left
        width: 80% 
        height: 100%
        overflow-y: auto
        .hero
          width: 100% 
          flex-align(flex-start, flex-start, wrap) 
        .hero-item
          width: 25%
          text-align: center
          padding: .8rem
          padding-bottom: 0
          box-sizing: border-box 
          .hero-avatar
            position: relative
            width: 100%
            padding-bottom: 100%
            .avatar
              pos-base()
          .hero-name
            margin-top: 0.5rem 
            margin-bottom: 0.2rem 
            height: 2rem
            line-height: 2rem
            font-size: $font-s
            color: $dark-22
      .dropdown-right
        width: 20%
        .nav
          background-color: $white-f5
          color: $dark
          text-align: center
          .nav-item
            height: 4.2rem
            line-height: 4.2rem
            &.active-cate
              color: $white
              background-color: $orange
            
</style>
