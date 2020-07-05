<template>
  <div id="cate-edit">
    <el-card class="box-card">
      <h1 class="title">{{ id ? '编辑' : '新建' }}分类</h1>
      <el-select v-model="model.parent" placeholder="请选择">
        <el-option label="无上级分类" value="" :disabled="id && !editFlag"></el-option>
        <el-option
          v-for="item in level"
          :key="item._id"
          :label="item.name"
          :value="item._id"
          :disabled="id && editFlag">
        </el-option>
      </el-select>
      <el-input v-model="model.name" placeholder="请输入分类名称" @keydown.native.enter="save"></el-input>
      <div class="save">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { saveCate, updateCate, fetchCateOne, fetchCateItem } from '@/api/system' 
  export default {
    name: 'CateEdit',
    props: ['id'],
    data () {
      return {
        model: {  // 分类的名字和父级
          name: '',
          parent: ''
        },
        level: [],   // 一级分类数据
        editFlag: true // 标记要编辑的分类是一级还是二级, true为一级
      }
    },
    watch: {
      $route () {
        if (this.id) {
          this.fetchItem()
        } else {
          this.model.name = ''
          this.model.parent = ''
        }
      }
    },
    mounted () {
      this.fetchOne()
      this.id && this.fetchItem()
    },
    methods: {
      // 保存分类
      async save () {
        const { name, parent } = this.model
        const id = this.id
        // 名字不能为空
        if (!name) {   
          this.$message.error('分类名称不能为空')
          return
        }
        //根据id判断是新建还是编辑
        let res
        if (id) {   
          res = await updateCate({ id, name, parent })
        } else {
          res = await saveCate({ name, parent })
        }
        // 分类已存在
        if (res.status == 1) {
          this.$message.error(res.msg)
          return
        }
        this.$message.success(res.msg)
        this.$router.push('/system/cateList')
      },

      // 查询一级分类
      async fetchOne () {
        const res = await fetchCateOne()
        this.level = res.data
      },

      // 查询要编辑的分类信息
      async fetchItem () {
        const res = await fetchCateItem({ id: this.id })
        this.model.name = res.data.name
        this.model.parent = res.data.parent ?  res.data.parent : ''
        this.editFlag = res.data.parent ? false : true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable.styl"
  #cate-edit
    .box-card
      width: 520px
      box-shadow: none
      .title, .el-select, .el-input
        margin-bottom: 30px
      .title
        font-size: $font-s
      .el-input
        width: 70% 

</style>

