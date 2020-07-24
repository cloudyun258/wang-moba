<template>
  <div class="card">
    <div class="card-header" :class="{ 'more': more }">
      <div class="header">
        <i class="type-icon" 
        :style="{ backgroundImage: 'url(' + require(`../assets/images/icon/${this.icon}`) + ')' }">
        </i>
        <div class="title">{{ title }}</div>
        <i class="more-icon" v-if="more" @click="showMore"></i>
      </div>
      <slot name="banner"></slot>
    </div>
    <!-- end of header -->
    <div class="card-body">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      title: { type: String, require: true },
      icon: { type: String, require: true },
      more: { type: Boolean, default: true }
    },
    methods: {
      // 点击查看更多跳转不同路由
      showMore () {
        let path = ''
        switch (this.title) {
          case '新闻资讯': path = '/newsList'
            break
          case '英雄列表': path = '/heroList'
            break
          case '精彩视频': path = '/strategy'
            break
        }
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  .card
    background-color: $white
    margin-top: 1rem
    padding: 0 1.7rem
    border-bottom($grey-9e)
    .card-header
      padding: 1.5rem 0 
      &.more
        margin-bottom: 1.2rem  
        border-bottom()
      .header
        flex-align(flex-start)
        height: 2rem
        line-height: 2rem   
        .type-icon
          bg-img(2rem, 2rem, '../assets/images/icon/icon.png', 1.4rem, auto, left, center)
        .title
          flex: 1
          position: relative
          top: 0.1rem
          font-size: $font-l
          margin-left: 0.5rem
          color: $dark-21 
        .more-icon
          sprite-icon(1.8rem, 1.2rem, -17rem, -25rem) 
    .card-body
      padding-bottom: 0
          
</style>