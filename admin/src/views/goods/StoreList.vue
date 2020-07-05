<template>
  <div id="store-list">

    <el-card class="box-card data-list-card">
      <div class="left">
        <i class="el-icon-document"></i>
        <span class="title">数据列表</span>
      </div>
      <div class="right">
        <el-button size="small" @click="$router.push('/goods/storeAdd')">添加</el-button>
      </div>
    </el-card>

    <el-table
      :data="storeList"
      border
      style="width: 100%">
      <el-table-column
        prop="number"
        label="编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="铭文名称"
        width="250">
      </el-table-column>
      <el-table-column label="图标" width="150">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="40" :src="scope.row.icon"></el-avatar>
        </template>
      </el-table-column>
       <el-table-column
        prop="categoryName"
        label="所属分类"
        width="150">
      </el-table-column>
       <el-table-column
        prop="attr"
        label="属性描述"
        width="520">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" @click="$router.push(`/goods/storeUpdate/${scope.row._id}`)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteStore(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="storeTotal"
        :page-size="pageSize"
        :current-page="page"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { getStore, deleteStore } from '@/api/goods' 
  export default {
    name: 'StoreList',
    data () {
      return {
        storeList: [], // 当前页铭文数据
        storeTotal: 20,   // 铭文总数量
        pageSize: 5,  // 每页显示的个数
        page: 1   // 当前页数
      }
    },
    mounted () {
      this.fetchStore()
    },
    methods: {
      // 获取铭文数据
      async fetchStore() {
        const { page, pageSize } = this
        const res = await getStore({ page, pageSize })
        this.handleStore(res.data)
      },
      // 删除铭文
      async deleteStore (row) {
        this.$confirm(`确认要删除铭文"${row.name}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const  { page, storeList } = this
          const res = await deleteStore({ id: row._id })
          this.$message.success('删除成功')
          // 如果当前不是第一页且当前页只有一条数据
          if (page !=1 && storeList.length == 1) {
            this.page = page - 1
          }
          this.fetchStore()
        })
      },
      // 页数改变时
      pageChange (currentPage) {
        this.page = currentPage
        this.fetchStore()
      },
      // 对返回的数据处理
      handleStore (data) {
        data.storeList.forEach((item, index) => {
          // 设置编号
          if (this.page == 1) {
            item.number = index + 1
          } else {
            item.number = (this.page - 1)  * this.pageSize + (index + 1)
          }
          // 遍历分类信息添加一个categoryName字段
          item.categoryInfo.forEach(cate => {
            item.categoryName = cate.name
          })
          // 拼接属性字符串, 原数据是字符串数组
          let attrStr = ''
          item.attr.forEach((attr, index) => {
            // 如果是最后一项
            if (index == item.attr.length - 1) {
              attrStr += attr
            } else {
              attrStr += attr + ' / '
            }
          })
          item.attr = attrStr
        })
        this.storeTotal = data.storeTotal
        this.storeList = data.storeList
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>