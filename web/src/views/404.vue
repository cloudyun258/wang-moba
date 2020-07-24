<template>
  <div id="not-found">
    <img src="../assets/images/404.png" class="error" alt="404 Not Found">
    <button class="back radius-small" @click="$router.push('/')">返回主页</button>
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
    padding-top: 5rem
    text-align: center
    .error
      width: 90% 
    .back
      font-size: $font-md
      padding: .6rem 2rem
      margin-top: 2.5rem
      color: $white
      background-color: $blue-4d

</style>