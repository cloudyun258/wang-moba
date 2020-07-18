<template>
  <div id="hero-list">
    <div class="nav">
      <div class="nav-item" 
        v-for="(item, index) in catesHero" 
        :key="index"
        :class="{'active': active == index}"
        @click="toggleNav(index, item)">
        <span class="nav-link">{{ item }}</span>
      </div>
    </div>
    <!-- end of nav -->
    <div class="hero">
      <div class="hero-item" v-for="(item, index) in heroList" :key="index">
        <div class="hero-avatar">
          <img :src="item.avatar" class="avatar" alt="avatar">
        </div>
        <div class="hero-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import  { fetchHeroListTwo } from '@/api/index'
  export default {
    name: 'HeroList',
    data () {
      return {
        heroList: [], // 当前分类下的英雄数据
        catesHero: ['全部', '法师', '刺客', '战士', '辅助', '射手', '坦克'], //英雄分类
        active: 0,  // 当前选中的英雄分类
        heroType: '全部'
      }
    },
    mounted () {
      this.fetchHeroListTwo()
    },
    methods: {
      // 获取英雄列表数据
      async fetchHeroListTwo () {
        const res = await fetchHeroListTwo({ heroType: this.heroType })
        this.heroList = res.data
      },
      // 英雄类型切换
      toggleNav (index, heroType) {
        this.active = index
        this.heroType = heroType
        this.fetchHeroListTwo()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  #hero-list
    padding: 0 1.2rem
    .nav
      flex-align()
      font-size: $font-sm
      color: $dark-34
      margin-top: 1.6rem 
      .nav-item
        position: relative
        padding-bottom: 0.5rem
        &:after
          content: ''
          pos-base(absolute, 0, auto, 100%, 0.3rem, auto, 0)
          background-color: transparent
        &.active
          color: $orange 
        &.active:after
          background-color: $orange 
    .hero
      flex-align(flex-start, flex-start, wrap)
      margin: 1rem -0.7rem
      .hero-item
        width: 20%
        text-align: center
        padding: .7rem
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
</style>
