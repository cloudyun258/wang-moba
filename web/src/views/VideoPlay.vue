<template>
  <div id="video-play">
    <video :src="videoDetail.video" controls width="100%"></video>
    <div class="video-info">
      <div class="avatar">
        <img src="../assets/images/default_head.jpg" width="100%" alt="avatar">
      </div>
      <div class="title">{{ videoDetail.title }}</div>
      <div class="other">
        <span class="public">投稿: 1035</span>
        <span class="fans">粉丝: 128</span>
      </div>
      <div class="sign">个性签名: 这个人很懒, 什么都没有留下(〜￣△￣)〜</div>
    </div>
    <div class="recommend">
      <img src="../assets/images/love.png" class="love-icon" alt="love-icon">
      <span class="love-txt">猜你喜欢</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VideoPlay',
    data () {
      return {
        videoDetail: {}
      }
    },
    mounted () {
      this.videoDetail = JSON.parse(localStorage.getItem('video'))
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  #video-play
    .video-info
      position: relative
      margin: 1rem 0.5rem
      padding: 1rem
      padding-left: 7.5rem
      border-all()
      .title
        font-size: $font-sm
        color: $dark-2f
        margin-bottom: 0.5rem 
      .other, .sign
        font-size: $font-xxs
        color: $grey-6d
      .other .fans
        margin: 0 2rem  
      .avatar
        pos-base(absolute, 0, 1rem, 5.7rem, auto)
    .recommend
      margin-top: 1.5rem
      margin-left: 0.5rem 
      .love-txt
        margin-left: 0.7rem 
      .love-icon
        width: 1.5rem
        vertical-align: top     

</style>
