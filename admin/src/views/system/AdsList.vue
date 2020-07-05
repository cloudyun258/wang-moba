<template>
  <div id="ads-list">
    <el-card class="box-card data-list-card">
      <div class="left">
        <i class="el-icon-document"></i>
        <span class="title">数据列表</span>
      </div>
      <div class="right">
        <el-button size="small" @click="$router.push('/system/adsAdd')">添加</el-button>
      </div>
    </el-card>

    <el-table
      :data="adsList"
      border
      style="width: 100%">
      <el-table-column
        prop="number"
        label="编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="广告位名称"
        width="550">
      </el-table-column>
      <el-table-column
        prop="adNum"
        label="广告数量"
        width="350">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" @click="$router.push(`/system/adsUpdate/${scope.row._id}`)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteAds(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { deleteAds, fetchAds } from '@/api/system'
  export default {
    name: 'AdsList',
    data () {
      return {
        adsList: []
      }
    },
    mounted () {
      this.fetchAds()
    },
    methods: {
      // 获取广告位列表数据
      async fetchAds () {
        const res = await fetchAds()
        this.handleAds(res.data)
      },
      // 删除广告位
      async deleteAds (row) {
        this.$confirm(`确认要删除广告位"${row.name}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await deleteAds({ id: row._id })
          this.$message.success('删除成功')
          this.fetchAds()
        })
      },
      // 对返回的数据处理
      handleAds (data) {
        data.forEach((item, index) => {
          item.number = index + 1
          item.adNum = item.items.length
        })
        this.adsList = data
      }      
    }
  }
</script>

<style lang="stylus" scoped>

</style>