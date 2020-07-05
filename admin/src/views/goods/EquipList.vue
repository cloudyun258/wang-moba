<template>
  <div id="equip-list">
    <el-card class="box-card data-list-card">
      <div class="left">
        <i class="el-icon-document"></i>
        <span class="title">数据列表</span>
      </div>
      <div class="right">
        <el-button size="small" @click="$router.push('/goods/equipAdd')">添加</el-button>
      </div>
    </el-card>

    <el-table
      :data="equipList"
      border
      style="width: 100%">
      <el-table-column
        prop="number"
        label="编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="装备名称"
        width="500">
      </el-table-column>
      <el-table-column label="图标" width="300">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="40" :src="scope.row.icon"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" @click="$router.push(`/goods/equipUpdate/${scope.row._id}`)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteEquip(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="equipTotal"
        :page-size="pageSize"
        :current-page="page"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { getEquip, deleteEquip } from '@/api/goods' 
  export default {
    name: 'EquipList',
    data () {
      return {
        equipList: [],
        equipTotal: 20,   // 装备总数量
        pageSize: 5,  // 每页显示的个数
        page: 1   // 当前页数
      }
    },
    mounted () {
      this.fetchEquip()
    },
    methods: {
      // 获取装备数据
      async fetchEquip () {
        const { page, pageSize } = this
        const res = await getEquip({ page, pageSize })
        this.handleEquip(res.data)
      },
      // 删除装备
      async deleteEquip (row) {
        this.$confirm(`确认要删除装备"${row.name}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const { page, equipList } = this
          const res = await deleteEquip({ id: row._id })
          this.$message.success('删除成功')
          // 如果当前不是第一页且当前页只有一条数据
          if (page !=1 && equipList.length == 1) {
            this.page = page - 1
          }
          this.fetchEquip()
        })
      },
      // 页数改变
      pageChange (currentPage) {
        this.page = currentPage
        this.fetchEquip()
      },
      // 对返回的数据处理
      handleEquip (data) {
        data.equipList.forEach((item, index) => {
          if (this.page == 1) {
            item.number = index + 1
          } else {
            item.number = (this.page - 1)  * this.pageSize + (index + 1)
          }    
        })
        this.equipTotal = data.equipTotal
        this.equipList = data.equipList
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>