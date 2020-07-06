<template>
  <div id="user-edit">
    <el-card class="box-card">
      <h1 class="title">{{ id ? '编辑' : '新建' }}管理员</h1>
      <el-input v-model="model.username" placeholder="请输入用户名" @keydown.native.enter="save"></el-input>
      <el-input placeholder="请输入密码" v-model="model.password" @keydown.native.enter="save" show-password></el-input>
      <div class="save">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { saveUser, updateUser, fetchUserItem } from '@/api/user'
  export default {
    name: 'UserEdit',
    props: ['id'],
    data () {
      return {
        model: {
          username: '',
          password: ''
        }
      }
    },
    watch: {
      $route () {
        if (this.id) {
          this.getUserItem()
        } else {
          this.model.username = ''
          this.model.password = ''
        }
      }
    },
    mounted () {
      this.id && this.getUserItem()
    },    
    methods: {
      // 保存管理员
      async save () {
        const { username, password } = this.model
        const id = this.id
        // 名字不能为空
        if (!username) {   
          this.$message.error('用户名不能为空')
          return
        }
        if (!password) {
          this.$message.error('密码不能为空')
          return
        }
         //根据id判断是新建还是编辑
        let res
        if (id) {   
          res = await updateUser({ id, username, password })
        } else {
          res = await saveUser({ username, password })
        }
        // 该管理员已存在
        if (res.status == 1) {
          this.$message.error(res.msg)
          return
        }
        this.$message.success(res.msg)
        this.$router.push('/system/userList')
      },
      // 获取管理员详情
      async getUserItem () {
        const res = await fetchUserItem({ id: this.id })
        this.model.username = res.data.username
        this.model.password = ''
      }      
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable.styl"
  #user-edit
    .box-card
      width: 520px
      box-shadow: none
      .title, .el-input
        margin-bottom: 30px
      .title
        font-size: $font-s
      .el-input
        width: 70% 

</style>