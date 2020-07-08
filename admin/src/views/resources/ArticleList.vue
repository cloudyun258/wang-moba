<template>
  <div id="article-list">
    <el-card class="box-card data-list-card">
      <div class="left">
        <i class="el-icon-document"></i>
        <span class="title">数据列表</span>
      </div>
      <div class="right">
        <el-button size="small" @click="$router.push('/resource/articleAdd')">添加</el-button>
      </div>
    </el-card>

    <el-table
      :data="articleList"
      border
      style="width: 100%">
      <el-table-column
        prop="number"
        label="编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
        width="600">
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="所属分类"
        width="280">
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建时间"
        width="220">
      </el-table-column>            
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" @click="$router.push(`/resource/articleUpdate/${scope.row._id}`)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteArticle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="articleTotal"
        :page-size="pageSize"
        :current-page="page"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { fetchArticle, deleteArticle } from '@/api/resource'
  import dayjs from 'dayjs'
  export default {
    name: 'ArticleList',
    data () {
      return {
        articleTotal: 20,
        pageSize: 5,
        page: 1,
        articleList: []
      }
    },
    mounted () {
      this.fetchArticle()
    },
    methods: {
      // 获取文章列表
      async fetchArticle () {
        const { page, pageSize } = this
        const res = await fetchArticle({ page, pageSize })
        this.handleArticle(res.data)
      },
      // 删除文章
      async deleteArticle (row) {
        this.$confirm(`确认要删除文章"${row.title}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const  { page, articleList } = this
          const res = await deleteArticle({ id: row._id })
          this.$message.success('删除成功')
          // 如果当前不是第一页且当前页只有一条数据
          if (page !=1 && articleList.length == 1) {
            this.page = page - 1
          }
          this.fetchArticle()
        })        
      },
      // 页数改变时
      pageChange (currentPage) {
        this.page = currentPage
        this.fetchArticle()
      },
      // 对返回的数据处理
      handleArticle (data) {
        data.articleList.forEach((item, index) => {
          // 设置编号
          if (this.page == 1) {
            item.number = index + 1
          } else {
            item.number = (this.page - 1)  * this.pageSize + (index + 1)
          }
          // 格式化日期
          item.date = dayjs(Number(item.date)).format('YYYY-MM-DD')
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
        this.articleTotal = data.articleTotal
        this.articleList = data.articleList        
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>