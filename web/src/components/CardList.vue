<template>
  <div class="card-list">
    <m-card :title="title" :icon="icon" :more="more">
      <template v-slot:banner>
        <slot name="banner"></slot>
      </template>
      <!-- banner -->
      <template v-slot:content>
        <!-- 分类导航 -->
        <div class="nav">
          <div class="nav-item" 
            v-for="(item, index) in categories" 
            :key="index"
            :class="{'active': active == index}"
            @click="toggleNav(index)">
            <span class="nav-link">{{ item.name }}</span>
          </div>
        </div>
        <!-- 导航对应的项 -->
        <div class="items">
          <swiper ref="mySwiper" :options="options">
            <swiper-slide v-for="(item, index) in categories" :key="index">
              <slot name="item" :category="item"></slot>
            </swiper-slide>
          </swiper>
        </div>
      </template>
    </m-card>
  </div>
</template>

<script>
  import Card from '@/components/Card'
  import minxins_swiper from '@/assets/javascript/mixins_swiper'
  export default {
    name: 'CardList',
    mixins: [minxins_swiper],
    props: {
      title: { type: String, require: true },
      icon: { type: String, require: true },
      more: { type: Boolean, default: true },
      categories: { type: Array, require: true }
    },
    data () {
      return {
        active: 0
      }
    },
    components: {
      'm-card': Card
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  .card-list
    .nav
      flex-align()
      font-size: $font-sm
      color: $dark-34
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
    .items
      padding-top: 1.5rem
      padding-bottom: 1rem
      
</style>