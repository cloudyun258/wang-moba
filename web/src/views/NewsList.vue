<template>
  <div id="news-list">
    <div class="nav">
      <div class="nav-item" 
        v-for="(item, index) in catesList" 
        :key="index"
        :class="{'active': active == index}"
        @click="toggleNav(index, item.name)">
        <span class="nav-link">{{ item.name }}</span>
      </div>
    </div>
    <!-- end of nav -->
    <div class="news">
      <div class="news-item" v-for="(item, index) in newsList" :key="index">
        <div class="news-cate" :class="calcNewsClass(item.categoryName)">
          {{ item.categoryName }}
        </div>
        <router-link 
          tag="div" 
          :to="`/article/detail/${item._id}`" 
          class="news-title text-ellipsis">
          {{ item.title }}
        </router-link>
        <div class="news-date">{{ item.date | formatDateTwo }}</div>
      </div>
    </div>
    <!-- end of news -->
    <div class="next">
      <button class="next-btn radius-large" @click="fetchNext">
        {{ hasNext ? '点击加载更多' : '已显示全部内容' }}
      </button>
    </div>
  </div>
</template>

<script>
  import  { fetchNewsListOne, fetchNewsListTwo } from '@/api/index'
  export default {
    name: 'NewsList',
    data () {
      return {
        active: 0,  // 当前选中的导航
        catesList: [],
        newsList: [],  // 新闻列表数据
        newsType: '热门', // 选中的新闻类型
        page: 1,
        pageSize: 8,
        hasNext: true  //是否有下一页 
      }
    },
    mounted () {
      this.fetchNewsListOne()
      this.fetchNewsListTwo()
    },
    methods: {
      // 获取新闻数据
      async fetchNewsListOne () {
        const res = await fetchNewsListOne()
        this.catesList = res.data
      },
      // 获取新闻列表数据
      async fetchNewsListTwo () {
        const { newsType, page, pageSize } = this
        const res = await fetchNewsListTwo({ newsType, page, pageSize })
        this.newsList = this.newsList.concat(res.data.newsList)
        this.hasNext = res.data.hasNext
      },
      // 切换新闻类型
      toggleNav (index, newsType) {
        this.active = index
        this.page = 1
        this.newsType = newsType
        this.newsList = []
        this.fetchNewsListTwo()
      },
      // 获取下一页数据
      fetchNext () {
        // 没有下一页
        if (!this.hasNext) {
          return
        }
        this.page = this.page + 1
        this.fetchNewsListTwo()
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
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  #news-list
    .nav
      flex-align()
      border-bottom($grey-9e)
      margin-bottom: 1.5rem 
      .nav-item
        position: relative
        width: 25%
        height: 3.5rem
        line-height: 3.5rem  
        text-align: center 
        font-size: $font-md
        &.active
          bg-img(25%, 3.5rem, "../assets/images/video_navBg.png", 100%, 110%)
          color: $white
        &:after
          content: ''
          pos-base(absolute, auto, 0, 1px, 100%, 0, auto)
          background-color: $grey-9e
          transform: scale(0.4, 0.9)
        &:last-child:after
          width: 0
    .news
      padding: 0 0.8rem
      .news-item
        flex-align(flex-start)
        margin-bottom: 1.5rem
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
        .news-date
          margin-left: 1rem
          font-size: $font-s
          color: $grey-9f
    .next
      margin-bottom: 1.5rem 
      .next-btn
        width: 100%
        background-color: $grey-e6
        height: 3.5rem
        line-height: 3.5rem 
        color: $grey-85
        font-size: $font-sm 

</style>
