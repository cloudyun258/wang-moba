<template>
  <div id="nav-bar">
    <div class="fold-icon-wrap" @click="toggleMenuCollapse">
      <i class="el-icon-s-unfold" v-if="!isCollapse"></i>
      <i class="el-icon-s-fold" v-if="isCollapse"></i>
    </div>

    <bread-crumb @hideAvatar="isAvatar=false" @showAvatar="isAvatar=true"></bread-crumb>

    <div class="dropdown-wrap" v-if="isAvatar">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar shape="square" size="medium" 
            src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2159143452,2918152275&fm=26&gp=0.jpg"></el-avatar>
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="dashboard">首页</el-dropdown-item>
          <el-dropdown-item :divided="true" command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  
  </div>
</template>

<script>
  import BreadCrumb from '@/components/BreadCrumb'
  export default {
    props: ['mobile'],
    name: 'NavBar',
    data () {
      return {
        isAvatar: true   // 控制头像的显示
      }
    },
    computed: {
      isCollapse () {
        return this.$store.state.isCollapse
      }
    },
    methods: {
      // 侧边栏折叠切换
      toggleMenuCollapse () {
        // 如果当前屏幕宽度 < 768(参考 bootstrap 移动设备)
        if (this.mobile) {
          this.$store.dispatch('toggleCollapse', false)
          this.$emit('openMenu')
          return
        }
        this.$store.dispatch('toggleCollapse', !this.isCollapse)
      },
      // 点击菜单项触发事件
      handleCommand (command) {
        command === 'logout' ? this.logout() : 
        this.$router.push('/home')
      },
      // 退出登录
      logout () {
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    },
    components: {
      BreadCrumb
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  #nav-bar
    height: 50px 
    .fold-icon-wrap
      float: left
      i[class^="el-icon"]
        width: 20px
        height: 20px 
        font-size: $font-sm
        cursor: pointer
    .dropdown-wrap
      float: right
      height: 50px
      cursor: pointer
      .el-dropdown-link
        display: flex
        align-items: center
        height: 50px
        i[class^="el-icon"]
          position: relative
          top: 8px
      .el-avatar--square
        border-radius: 10px
        margin-right: 10px 

</style>