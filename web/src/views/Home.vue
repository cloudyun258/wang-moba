<template>
  <div id="home">
    <div class="swiper-wrap">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="(item, index) in homeAds" :key="index">
          <a :href="item.url"><img width="100%" :src="item.image" alt="ads"></a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- end of swiper -->
    <div class="icon-wrap">
      <div class="icon" :class="{'down': !foldIcon}">
        <div class="icon-item">
          <a href="https://pvp.qq.com/m/m201706/coming/index.htm" style="display: block">
            <i class="sprite sprite-one"></i>
            <div class="text">爆料站</div>
          </a>
        </div>
        <div class="icon-item">
          <a href="javascript:;" style="display: block">
            <i class="sprite sprite-two"></i>
            <div class="text">故事站</div>
          </a>
        </div>
        <div class="icon-item">
          <a href="javascript:;" style="display: block">
            <i class="sprite sprite-three"></i>
            <div class="text">周边商城</div>
          </a>
        </div>
        <div class="icon-item">
          <a href="javascript:;" style="display: block">
            <i class="sprite sprite-four"></i>
            <div class="text">体验服</div>
          </a>
        </div>
        <div class="icon-item">
          <a href="javascript:;" style="display: block">
            <i class="sprite sprite-five"></i>
            <div class="text">新人专区</div>
          </a>
        </div>
        <div class="icon-item">
          <a href="javascript:;" style="display: block">
            <i class="sprite sprite-six"></i>
            <div class="text">荣耀-传承</div>
          </a>
        </div>
        <div class="icon-item">
          <a href="javascript:;" style="display: block">
            <i class="sprite sprite-seven"></i>
            <div class="text">王者营地</div>
          </a>
        </div>
        <div class="icon-item">
          <a href="javascript:;" style="display: block">
            <i class="sprite sprite-eight"></i>
            <div class="text">公众号</div>
          </a>
        </div>
        <div class="icon-item">
          <a href="javascript:;" style="display: block">
            <i class="sprite bg-one"></i>
            <div class="text">版本介绍</div>
          </a>
        </div>
        <div class="icon-item">
          <a href="javascript:;" style="display: block">
            <i class="sprite bg-two"></i>
            <div class="text">对局环境</div>
          </a>
        </div>
        <div class="icon-item">
          <a href="javascript:;" style="display: block">
            <i class="sprite bg-three"></i>
            <div class="text">无限王者团</div>
          </a>
        </div>
        <div class="icon-item">
          <a href="javascript:;" style="display: block">
            <i class="sprite bg-four"></i>
            <div class="text">创意互动营</div>
          </a>
        </div>          
      </div> 
      <div class="fold" @click="foldIcon=!foldIcon">
        <i class="fold-icon" :class="{ 'down': !foldIcon }"></i>
        <span class="fold-nane">收起</span>
      </div>
    </div>
    <!-- end of icon -->
    <m-card-list title="新闻资讯" icon="icon_news.jpg" :categories="newCats">
      <template #item="{category}">
        <div class="news-item" v-for="(item, index) in category.newsList" :key="index">
          <div class="news-cate" :class="calcNewsClass(item.categoryName)">{{ item.categoryName }}</div>
          <router-link tag="div" to="/home" class="news-title text-ellipsis">{{ item.title }}</router-link>
          <div class="news-date">{{ item.date }}</div>
        </div>
      </template>
    </m-card-list>
  </div>
</template>

<script>
  import  { fetchHomeAds } from '@/api/index'
  import CardList from '@/components/CardList'
  export default {
    name: 'Home',
    data () {
      return {
        homeAds: [], // 广告数据
        foldIcon: false, // 控制图标区域的展开
        newCats: [
          {
            name: '热门',
            newsList: new Array(5).fill({}).map(v => ({
              categoryName: '公告',
              title: '7月14日全服不停机更新公告',
              date: '06/21'
            }))
          },
          {
            name: '新闻',
            newsList: new Array(5).fill({}).map(v => ({
              categoryName: '新闻',
              title: '7月14日全服不停机更新公告',
              date: '01/21'
            }))
          },
          {
            name: '活动',
            newsList: new Array(5).fill({}).map(v => ({
              categoryName: '活动',
              title: '2020年王者荣耀世界冠军杯小组赛赛程出炉拉拉拉拉',
              date: '07/21'
            }))
          },
          {
            name: '公告',
            newsList: new Array(5).fill({}).map(v => ({
              categoryName: '公告',
              title: '7月14日全服不停机更新公告',
              date: '09/21'
            }))
          },
          {
            name: '赛事',
            newsList: new Array(5).fill({}).map(v => ({
              categoryName: '赛事',
              title: '7月14日全服不停机更新公告',
              date: '12/21'
            }))
          }
        ],
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
        }
      }
    },
    mounted () {
      this.fetchHomeAds()
    },
    methods: {
      // 获取轮播广告数据
      async fetchHomeAds () {
        const res = await fetchHomeAds()
        this.homeAds = res.data
      },
      // 计算新闻分类类名
      calcNewsClass (categoryName) {
        let className = ''
        switch (categoryName) {
          case '新闻': className = 'news-cate-one'
            break
          case '公告': className = 'news-cate-two'
            break
          case '活动': className = 'news-cate-three'
            break
          case '赛事': className = 'news-cate-four'
            break
          default: categoryName = 'news-cate-one'
        }
        return className
      }
    },
    components: {
      'm-card-list': CardList
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  #home
    .icon-wrap
      margin-top: 1rem 
      padding-top: 1rem
      background-color: $white
      .icon
        flex-align(space-between, flex-start)
        text-align: center 
        overflow: auto
        &.down
          flex-wrap: wrap
          .icon-item:nth-child(4n):after
            width: 0
      .icon-item
        width: 25%
        margin-bottom: 1rem
        padding: 0.7rem 0
        position: relative
        flex-shrink: 0
        &:after
          content: ''
          pos-base(absolute, auto, 0, 1px, 100%, 0, auto)
          background-color: $grey-d4
          transform: scale(0.8)
        .sprite-one
          sprite-icon(2.3rem, 2.4rem, -22.4rem, -6.3rem)
        .sprite-two
          sprite-icon(2.3rem, 2.4rem, -31.8rem, -6.4rem)
        .sprite-three
          sprite-icon(1.9rem, 2.4rem, -13.1rem, -0.2rem)
        .sprite-four
          sprite-icon(2rem, 2.4rem, -3.7rem, -6.3rem)
        .sprite-five
          sprite-icon(2rem, 2.4rem, -31.9rem, -0.2rem)
        .sprite-six
          sprite-icon(2.4rem, 2.4rem, -12.8rem, -6.2rem)
        .sprite-seven
          sprite-icon(2.4rem, 2.4rem, -22.2rem, -0.4rem)
        .sprite-eight
          sprite-icon(2.4rem, 2.4rem, 0, -41.4rem)
        .bg-one
          bg-img(2.4rem, 2.4rem, "../assets/images/icon/version-icon.png", 2.4rem, 2.4rem)
        .bg-two
          bg-img(4rem, 2.4rem, "../assets/images/icon/djhj.png", 4rem, 2.4rem)   
        .bg-three
          bg-img(5rem, 2.4rem, "../assets/images/icon/wxwzt.png", 5rem, 1.7rem, 0, 0.5rem)   
        .bg-four
          bg-img(2.4rem, 2.4rem, "../assets/images/icon/cyhdy.png", 2.4rem, 2.4rem)   
      .fold
        height: 3rem
        line-height: 3rem
        text-align: center   
        background-color: $white-f9
        .fold-icon
          sprite-icon(1rem, 1rem, -14.1rem, -23.2rem)
          margin-right: 0.3rem
          &.down
            transform: rotateX(180deg) 
    .news-item
      flex-align(flex-start)
      margin-bottom: 1.7rem
      &:last-child
        margin-bottom: 0  
      .news-cate
        font-size: $font-xxs 
        padding: 0 0.3rem
        margin-right: 1rem
        margin-left: 0.15rem 
        &.news-cate-one
          border-all($green)
          color: $green
        &.news-cate-two
          border-all($orange-f0)
          color: $orange-f0 
        &.news-cate-three
          border-all($red)
          color: $red
        &.news-cate-four
          border-all($blue-4d)
          color: $blue-4d                             
      .news-title
        flex: 1
        font-size: $font-md
        color: $dark-22 
      .news-date
        margin-left: 0.7rem
        font-size: $font-s
        color: $grey-77

</style>
