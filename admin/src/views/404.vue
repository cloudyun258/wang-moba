<template>
  <div id="not-found">
    <div class="img-wrap">
      <img class="not-img" src="../assets/images/error/404_2.gif" alt="404">
    </div>
    <div class="tips-wrap">
      <h1 class="txt-one">OOPS!</h1>
      <h2 class="txt-two">很抱歉，页面它不小心迷路了！</h2>
      <p class="txt-three">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</p>
      <el-button type="primary" round class="btn" @click="$router.push('/home')">返回首页</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound'
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  #not-found
    display: flex
    align-items: center 
    width: 80%
    min-width: 1150px 
    margin: 120px auto
    .img-wrap
      width: 50%
      .not-img
        display: block
        width: 100% 
    .tips-wrap
      width: 50%
      margin-top: -70px
      .txt-one, .txt-two, 
      .txt-three, .btn
        margin: 22px 0
        margin-left: 100px 
      .txt-one
        color: $colorB
        font-size: $font-xxl
        font-weight: 700
      .txt-two
        color: rgb(96, 98, 102)
        font-weight: 700
      .txt-three
        color: rgb(144, 147, 153)
        font-size: $font-xxs
        margin-bottom: 0 

</style>

