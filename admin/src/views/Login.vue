<template>
  <div id="login">
    <img src="../assets/images/login_bg.png" class="login-bg">
    <div class="login-card">
      <div class="card-body">
        <div class="logo">
          <img width="100" src="../assets/images/logo_wang.png">
        </div>
        <h2 class="title">wang-moba-admin</h2>

        <el-form 
          :model="ruleForm" 
          :rules="rules" 
          ref="ruleForm"
          class="info"
        >
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名"
              v-model="ruleForm.username"
            >
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="ruleForm.password"
              show-password
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn btn-login" @click="submitForm" :loading="loading">登录</el-button>
            <el-button type="primary" class="btn btn-reset" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
  import { login } from '@/api/user'

  export default {
    name: 'Login',
    data () {
      return {
        loading: false,  // 控制登录按钮的加载动画
        ruleForm: {
          username: 'admin',
          password: '123456'
        },
        rules: {   // 表单验证规则
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 重置表单
      resetForm () {
        this.$refs['ruleForm'].resetFields()
      },
      // 提交表单
      submitForm () {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            this.login()
          } 
        })
      },
      // 登录
      async login () {
        const { username, password } = this.ruleForm
        this.loading = true
        const res = await login({ username, password })
        this.loading = false
        if (res.status == 1) {  //账号或密码错误
          this.$message.error(res.msg)
          return
        }
        localStorage.setItem('token', res.token)
        this.$router.push('/home')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  #login
    .login-bg
      background-color: $colorB
      width: auto
      height: auto
      max-width: 100%
      max-height: 100%
      margin-top: 200px
    .login-card
      position: absolute
      left: 50%
      top: 17%
      z-index: 99 
      transform: translate3d(-50%, 0, 0) 
      width: 318px
      padding: 20px
      padding-bottom: 70px
      border: 1px solid #ebeef5
      border-top: 10px solid $colorB
      background-color: $colorA
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1)
      border-radius: 4px
      .logo
        text-align: center
      .title
        text-align: center
        color: $colorB
        font-size: $font-m
        margin: 25px 0
        font-weight: 700
      .info
        text-align: center
        .el-form-item:last-child
          margin-bottom: 0
        >>> .el-input__inner
          padding-left: 35px
        .el-input__icon
          color: $colorB
        .btn
          width: 44% 

</style>

