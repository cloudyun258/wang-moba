<template>
  <div id="user-list">
    <el-card class="box-card data-list-card">
      <div class="left">
        <i class="el-icon-document"></i>
        <span class="title">数据列表</span>
      </div>
      <div class="right">
        <el-button size="small" @click="$router.push('/system/userAdd')">添加</el-button>
      </div>
    </el-card>

    <el-table
      :data="userList"
      border
      style="width: 100%">
      <el-table-column
        prop="number"
        label="编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="500">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="500">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" @click="$router.push(`/system/userUpdate/${scope.row._id}`)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getUser, deleteUser } from '@/api/user'
  export default {
    name: 'UserList',
    data () {
      return {
        userList: []
      }
    },
    mounted () {
      this.fetchUser()
    },
    methods: {
      // 获取管理员列表
      async fetchUser () {
        const res = await getUser()
        this.handleUser(res.data) 
      },
      // 删除管理员
      async deleteUser (row) {
        this.$confirm(`确认要删除管理员"${row.username}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await deleteUser({ id: row._id })
          this.$message.success('删除成功')
          this.fetchUser()
        })        
      },
      // 对返回的阿数据进行处理
      handleUser (data) {
        data.forEach((item, index) => {
          item.number = index + 1
          item.password = '********'
        })
        this.userList = data
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>