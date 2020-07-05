<template>
  <div id="cate-list">

    <el-card class="box-card data-list-card">
      <div class="left">
        <i class="el-icon-document"></i>
        <span class="title">数据列表</span>
      </div>
      <div class="right">
        <el-button size="small" @click="$router.push('/system/cateAdd')">添加</el-button>
      </div>
    </el-card>

    <el-table
      :data="level"
      border
      style="width: 100%">
      <el-table-column
        prop="number"
        label="编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
        width="500">
      </el-table-column>
      <el-table-column
        prop="level"
        label="级别"
        width="150">
      </el-table-column>
      <el-table-column label="设置">
        <template slot-scope="scope">
          <el-button
            size="mini" 
            :disabled="scope.row.level==='二级'" 
            @click="fetchTwo(scope.row._id)">查看下级</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" @click="$router.push(`/system/cateUpdate/${scope.row._id}`)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteCate(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="back">
      <el-button type="primary" 
      @click="fetchOne" v-if="showBackBtn" size="small">返回上级</el-button>
    </div>
  
  </div>
</template>

<script>
  import { fetchCateOne, fetchCateTwo, deleteCate } from '@/api/system' 
  export default {
    name: 'CateList',
    data() {
      return {
        level: [],  // 分类数据
        levelOneId: ''  //点开二级分类时储存一级分类Id
      }
    },
    mounted () {
      this.fetchOne()
    },
    computed: {
      showBackBtn () {
        return this.level.every(item => item.level === '二级')
      }
    },
    methods: {
      // 获取一级分类
      async fetchOne () {
        let res = await fetchCateOne()
        this.handleLevel(res.data)
      },
      // 获取二级分类
      async fetchTwo (id) {
        this.levelOneId = id
        let res = await fetchCateTwo({ id })
        this.handleLevel(res.data)
      },
      async deleteCate (row) {
        this.$confirm(`确认要删除分类"${row.name}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await deleteCate({ id: row._id })
          this.$message.success('删除成功')
          // 根据返回按钮的有无判断应该获取一级还是二级分类数据
          this.showBackBtn ? this.fetchTwo(this.levelOneId) : this.fetchOne()
        })
      },  
      // 对返回的分类数据处理
      handleLevel (data) {
        data.forEach((item, index) => {
          if (item.parent) {
            item.level = '二级'
          } else {
            item.level = '一级'
          }
         item.number = index + 1
        })
        this.level = data
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #cate-list
    .back
      text-align: right
      margin-top: 20px  

</style>

