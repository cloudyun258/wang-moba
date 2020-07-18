<template>
  <div id="video-play">
    <video :src="videoDetail.video" controls width="100%"></video>
    <div class="video-info">
      <div class="avatar">
        <img src="../assets/images/default_head.jpg" alt="avatar">
      </div>
      <div class="title">{{ videoDetail.title }}</div>
      <div class="fans">
        <span>投稿: 1035</span>
        <span>粉丝: 128</span>
      </div>
      <div class="sign">个性签名: 这个人很懒, 什么都没有留下(〜￣△￣)〜</div>
    </div>
    <div class="recommend">
      <img src="../assets/images/love.png" alt="love">
      <span class="love">猜你喜欢</span>
    </div>
  </div>
</template>

<script>
  import { fetchVideo } from '@/api/index'
  export default {
    name: 'VideoPlay',
    props: ['id'],
    data () {
      return {
        videoDetail: {}
      }
    },
    mounted () {
      this.fetchVideo()
    },
    methods: {
      async fetchVideo () {
        const res = await fetchVideo({ id: this.id })
        this.videoDetail = res.data
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  #video-play
    .video-info
      position: relative
      margin: 1rem 5px
      padding: 1rem
      padding-left: 7.5rem
      border-all()
      .title
        font-size: $font-sm
        color: $dark-2f
        margin-bottom: 0.5rem 
      .fans, .sign
        font-size: $font-xxs
        color: $grey-6d
      .fans span
        margin-right: 2rem  
      .avatar
        position: absolute
        top: 1rem
        left: 0
        width: 5.7rem
        img
          width: 100%
    .recommend
      margin-top: 1.5rem 
      .love
        margin-left: 0.7rem 
      img
        width: 1.5rem
        vertical-align: top     

</style>
