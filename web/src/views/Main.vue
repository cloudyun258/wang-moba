<template>
  <div id="main">
    <div class="topbar">
      <div class="logo">
        <img @click="$router.push('/home')" src="../assets/images/logo.png" alt="logo">
      </div>
      <div class="text">
        <span class="name">王者荣耀</span><br>
        <span class="tips">团队成就更多</span>
      </div>
      <div class="download"></div>
    </div>
    <!-- end of topbar -->
    <div class="nav">
      <div class="nav-item">
        <router-link class="nav-link" to="/home">首页</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" to="/strategy">攻略中心</router-link>
      </div>      
      <div class="nav-item">
        <router-link class="nav-link" to="/match">赛事中心</router-link>
      </div>      
    </div>
    <!-- end of nav -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Main'
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  #main
    padding-top: 4.5rem 
    .topbar
      sprite-icon(100%, 4.5rem, 0, -71.5rem, 75rem, 91rem)
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
      .download
        sprite-icon(6rem, 2.4rem, -5.9rem, -30.9rem)
    .nav
      flex-align(flex-start)
      background-color: $orange
      .nav-item
        flex: 1
        text-align: center 
      .nav-link
        position: relative
        display: inline-block
        padding: 1rem 0 1.45rem 0
        font-size: $font-sm
        color: $white
        &:hover
          color: $white !important
        &:after
          content: ''
          pos-base(absolute, 0, auto, 100%, 0.3rem, auto, 0.9rem)
          background-color: transparent
        &.router-link-active:after
          background-color: $white 

</style>
