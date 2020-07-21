<template>
  <div id="hero-show">
    <div class="topbar">
      <div class="logo">
        <img @click="$router.push('/home')" src="../../assets/images/logo.png" alt="logo">
      </div>
      <div class="text">
        <span class="name">王者荣耀</span>
        <span class="tips">攻略站</span>
      </div>
      <router-link tag="div" to="/more/heroList" class="more"><span class="gt">&gt;</span></router-link>
    </div>    
    <img :src="showImage" width="100%" alt="showImage">
  </div>
</template>

<script>
  export default {
    name: 'HeroShow',
    data () {
      return {
        showImage: ''
      }
    },
    mounted () {
      this.showImage = localStorage.getItem('showImage')
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable.styl"
  @import "../../assets/stylus/mixins.styl"
  #hero-show
    padding-top: 4.5rem
    .topbar
      sprite-icon(100%, 4.5rem, 0, -71.5rem, 
      75rem, 91rem, "../../assets/images/icon/icon.png")
      flex-align(flex-start)
      color: $white
      .text 
        flex: 1
        margin-left: 1rem 
        font-size: $font-sm
        .name
          margin-right: 1.5rem
      .more
        font-size: $font-xs
        .gt
          vertical-align: middle
          margin-left: 1rem
          font-size: $font-xxl
</style>
