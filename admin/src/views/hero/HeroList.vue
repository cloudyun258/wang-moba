<template>
  <div id="hero-list">

    <el-card class="box-card data-list-card">
      <div class="left">
        <i class="el-icon-document"></i>
        <span class="title">数据列表</span>
      </div>
      <div class="right">
        <el-button size="small" @click="$router.push('/hero/heroAdd')">添加</el-button>
      </div>
    </el-card>

    <div class="search">
      <el-input placeholder="搜索英雄" v-model="name">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <el-table
      :data="heroList"
      border
      style="width: 100%">
      <el-table-column
        prop="number"
        label="编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="英雄名称"
        width="350">
      </el-table-column>
      <el-table-column label="头像" width="250">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="40" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
       <el-table-column
        prop="categoryName"
        label="所属分类"
        width="350">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" @click="$router.push(`/hero/heroUpdate/${scope.row._id}`)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteHero(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="heroTotal"
        :page-size="pageSize"
        :current-page="page"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>    
  </div>
</template>

<script>
  import { deleteHero, getHero} from "@/api/hero"
  export default {
    name: 'HeroList',
    data () {
      return {
        heroList: [],
        heroTotal: 20,   // 英雄总数量
        pageSize: 5,  // 每页显示的个数
        page: 1,   // 当前页数
        name: ''        
      }
    },
    watch: {
      // 搜索框内容变化时获取数据
      name () {
        this.page = 1
        this.fetchHero()
      }
    },
    mounted () {
      this.fetchHero()
    },
    methods: {
      // 获取英雄数据
      async fetchHero () {
        const { page, pageSize, name } = this
        const res = await getHero({ page, pageSize, name })
        this.handleHero(res.data)
      },
      // 删除英雄
      async deleteHero (row) {
        this.$confirm(`确认要删除英雄"${row.name}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const  { page, heroList } = this
          const res = await deleteHero({ id: row._id })
          this.$message.success('删除成功')
          // 如果当前不是第一页且当前页只有一条数据
          if (page !=1 && heroList.length == 1) {
            this.page = page - 1
          }
          this.fetchHero()
        })
      },
      // 页数改变时
      pageChange (currentPage) {
        this.page = currentPage
        this.fetchHero()
      },
      // 对返回的数据进行处理
      handleHero (data) {
        data.heroList.forEach((item, index) => {
          // 设置编号
          if (this.page == 1) {
            item.number = index + 1
          } else {
            item.number = (this.page - 1)  * this.pageSize + (index + 1)
          }
          // 拼接分类字符串, 原数据是对象数组
          let categoryStr = ''
          item.categoryInfo.forEach((cate, index) => {
            // 如果是最后一项
            if (index == item.categoryInfo.length - 1) {
              categoryStr += cate.name
            } else {
              categoryStr += cate.name + ' / '
            }
          })
          item.categoryName = categoryStr                  
        })
        this.heroTotal = data.heroTotal
        this.heroList = data.heroList
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable.styl"
  #hero-list
    .search
      overflow: hidden
      margin: 50px 0 15px 0
      .el-input
        float: right 
        width: auto 

</style>