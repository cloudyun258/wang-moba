<template>
  <div id="match">
    <div class="nav">
      <div 
        class="nav-item" 
        :class="{ 'active': active == index }"
        v-for="(item, index) in matchCate" 
        :key="index"
        @click="toggleNav(index)">
        <span class="nav-link">{{ item.name }}</span>
      </div>
    </div>
    <!-- end of nav -->
    <div class="content">
      <swiper ref="mySwiper" :options="options">
        <swiper-slide v-for="(item, index) in matchList" :key="index">
          <div class="title-wrap">
            <span class="title">{{ item.title }}</span>
            <span class="tag radius-large">官方举办</span>
          </div>
          <div class="banner-wrap">
            <img class="banner" :src="require(`../assets/images/match/${item.banner}`)" alt="banner">
          </div>
          <div class="infor-wrap">赛事资讯</div>
          <div class="article-wrap">
            <router-link tag="div" :to="`/article/detail/${article._id}`" class="article-item" v-for="(article, j) in item.matchList" :key="j">
              <div class="article-title text-ellipsis">{{ article.title }}</div>
              <div class="article-date">{{ article.date | formatDate('MM/DD') }}</div>
            </router-link>
          </div>
          <div class="next">
            <button class="next-btn radius-large" @click="loadMore">
              {{ btnText(item.hasNext) }}
            </button>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  import { fetchMatchCate, fetchMatchArticle } from '@/api/index'
  import minxins_swiper from '@/assets/javascript/mixins_swiper'
  export default {
    name: 'Match',
    mixins: [minxins_swiper],
    data () {
      return {
        matchCate: [], // 导航分类数据
        matchList: [],  // 文章数据
        params: [],  // 请求参数
        active: 0,  // 当前选中的导航
        busy: false  //  false为可以触发滚动加载
      }
    },
    mounted () {
      this.fetchMatchCate()
      window.addEventListener('scroll', this.scrollEvent)
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.scrollEvent, false)
    },
    computed: {
      // 加载按钮的显示文本
      btnText () {
        return (hasNext) => {
          let text = ''
          if (!hasNext) {
            text = '已显示全部内容'
          } else if (hasNext && this.busy) {
            text = '正在加载...'
          } else {
            text = '下拉加载更多'
          }
          return text
        }
      }
    },
    methods: {
      // 获取赛事中心二级分类
      async fetchMatchCate () {
        const cate = await fetchMatchCate()
        this.matchCate = cate.data
        // 构造文章请求参数
        this.matchCate.forEach((cate, index) => {
          this.params.push({
            name: cate.name,
            page: 1
          })
        })
        this.fetchMatchArticle()
      },
      // 获取赛事中心文章
      async fetchMatchArticle () {
        this.busy = true
        const match = await fetchMatchArticle({ params: this.params })
        this.busy = false
        this.handleMatch(match.data)
      },
      // 对返回的文章数据进行处理
      handleMatch (data) {
        data.forEach((item, index) => {
          switch(index) {
            case 0 : 
              item.title = '王者荣耀2020KPL春季赛'
              item.banner = 'match_01.jpg'
              break
            case 1 : 
              item.title = '2020王者荣耀世界冠军杯'
              item.banner = 'match_02.jpg'
              break
            case 2 : 
              item.title = 'KPLGT王者荣耀国际巡回赛' 
              item.banner = 'match_03.jpg'
              break
            case 3 : 
              item.title = '王者荣耀城市赛' 
              item.banner = 'match_04.jpg'
              break
            case 4 : 
              item.title = '王者荣耀高校赛'
              item.banner = 'match_05.jpg'
              break
            case 5 : 
              item.title = '王者荣耀TGA' 
              item.banner = 'match_06.jpg'
              break
            case 6 : 
              item.title = '微信游戏邀请赛'
              item.banner = 'match_07.jpg'
              break
            case 7 : 
              item.title = '模拟战大师赛'
              item.banner = 'match_08.jpg'
              break              
          }
        })
        this.matchList = data
      },
      // 获取下一页数据
      loadMore () {
        if (!this.matchList[this.active].hasNext) return
        this.params[this.active].page ++
        this.fetchMatchArticle()
      },
      // 滚动触发函数
      scrollEvent () {
        let pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight)
        let viewportHeight = window.innerHeight || document.documentElement.clientHeight 
            || document.body.clientHeight || 0
        let scrollHeight = window.pageYOffset || document.documentElement.scrollTop 
            || document.body.scrollTop || 0
        let loading =  pageHeight - viewportHeight - scrollHeight < 30
        if (loading && !this.busy) this.loadMore()        
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  #match
    .nav
      flex-align()
      overflow: auto
      margin: 0 0.7rem 1.5rem
      .nav-item
        position: relative
        flex-shrink: 0 
        margin: 0 1.2rem
        padding: 1.4rem 0
        font-size: $font-sm
        color: $dark
        &:after
          content: ''
          pos-base(absolute, 0, auto, 100%, 0.25rem, auto,0)
          background-color: transparent
        &.active:after
          background-color : $orange-d5
        &.active
          color: $orange-d5
        &:first-child
          margin-left: 0
        &:last-child
          margin-right: 0
    .content
      padding-top: 0.5rem
      padding-bottom: 4rem
      .title-wrap
        padding-left: 1rem
        .title
          font-weight: 700 
          color: $blue
          font-size: $font-xxl
        .tag
          padding: 0.2rem 0.8rem
          border: 1px solid $grey-a2
          text-align: center 
          margin-left: 1.5rem
          color: $grey-a2
      .banner-wrap
        position: relative
        width: 100% 
        margin-top: 1.5rem
        padding-bottom: calc(100vw / 1.786)
        .banner
          pos-base(absolute, 0, 0, 100%, auto)
      .infor-wrap
        background-color: $grey-e4
        color: $grey-a2
        font-size: $font-md
        text-align: center
        margin: 10px 0
        height: 2.8rem
        line-height: 2.8rem
      .article-wrap
        margin: 0 0.7rem
        .article-item
          flex-align()
          height: 3.2rem 
          .article-title
            font-size: $font-md 
          .article-date
            margin-left: 1.5rem
            color: $grey-9e
            font-size: $font-sm
      .next
        height: 3.5rem
        overflow-y: auto 
        padding: 0 0.7rem
        margin-bottom: 1.5rem 
      .next-btn
        width: 100%
        background-color: $grey-e6
        height: 3.5rem
        line-height: 3.5rem 
        color: $grey-85
        font-size: $font-sm      

</style>
