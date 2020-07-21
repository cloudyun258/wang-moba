<template>
  <div id="hero-skin">
    <div class="topbar">
      <div class="logo">
        <img @click="$router.push('/home')" src="../../assets/images/logo.png" alt="logo">
      </div>
      <div class="text">
        <span class="name">王者荣耀</span><br>
        <span class="tips">团队成就更多</span>
      </div>
    </div>
    <!-- end of topbar -->
    <div class="skin">
      <swiper ref="mySwiper" :options="swiperOptions" v-if="skins.length">
        <swiper-slide v-for="(item, index) in skins" :key="index">
          <img :src="item.banner" width="100%" alt="banner">
          <p class="name">{{ item.name }}</p>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeroSkin',
    data () {
      return {
        skins: [],
        swiperOptions: {
          // 小圆点
          pagination: {
            el: '.swiper-pagination'
          },
          // 循环播放
          loop: true           
        }
      }
    },
    mounted () {
      // 从本地获取皮肤数据
      this.skins = JSON.parse(localStorage.getItem('heroSkins'))
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable.styl"
  @import "../../assets/stylus/mixins.styl"
  #hero-skin
    padding: 5.5rem 1rem 0 
    .topbar
      sprite-icon(100%, 4.5rem, 0, -71.5rem, 
      75rem, 91rem, "../../assets/images/icon/icon.png")
      flex-align(flex-start)
      .text 
        flex: 1
        color: $white
        margin-left: 1rem 
        .name
          position: relative
          top: 0.3rem
          font-size: $font-sm
        .tips
          font-size: $font-xxs
          color: $grey-66
    .skin
      .swiper-slide
        width: 100% !important
      .swiper-pagination
        position: static
        text-align: center !important
        padding: 0
        >>> .swiper-pagination-bullet
          width: 1rem
          height: 0.5rem
          background-color: $grey-ba
          &.swiper-pagination-bullet-active
            background-color: $dark-16
            width: 1.5rem  
      .name
        text-align: center
        color: $dark-34
        font-size: $font-sm
        margin-bottom: 0


</style>
