<template>
  <div id="store-edit">
    <el-card class="box-card">
      <h1 class="title">{{ id ? '编辑' : '新建' }}铭文</h1>
      <el-select v-model="model.category" placeholder="请选择">
        <el-option
          v-for="item in storeCate"
          :key="item._id"
          :label="item.name"
          :value="item._id">
        </el-option>
      </el-select>
      <el-input v-model="model.name" placeholder="请输入铭文名称" @keydown.native.enter="save"></el-input>
      <el-input v-model="model.attr" placeholder="请输入属性描述 (xxx;xxx;xxx;)" @keydown.native.enter="save"></el-input>
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="false"
        :headers="uploadHeaders"
        :on-success="uploadSuccess">
        <img v-if="model.icon" :src="model.icon" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="save">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { fetchStoreTwo, saveStore, updateStore, fetchStoreItem } from '@/api/goods' 
  import mixins_upload from '@/assets/javascript/mixins_upload'
  export default {
    name: 'StoreEdit',
    mixins: [mixins_upload],
    props: ['id'],
    data () {
      return {
        model: {
          name: '',
          icon: '',
          attr: '',
          category: ''
        },
        storeCate: []
      }
    },
    watch: {
      $route () {
        if (this.id) {
          this.getStoreItem()
        } else {
          this.model.name = ''
          this.model.icon = ''
          this.model.attr = ''
          this.model.category = ''
        }
      }
    },
    mounted () {
      this.fetchStoreTwo()
      this.id && this.getStoreItem()
    },
    methods: {
      // 保存铭文
      async save () {
        let { name, icon, attr, category } = this.model
        const id = this.id
        if (!name || !icon || !category || !attr) {
          this.$message.error('请将信息填写完整')
          return
        }
        if (!/^([^;]{1,};){1,3}$/.test(attr)) {
          this.$message.error('铭文属性不符合规则 (xxx;xx;xxxx;)')
          return
        }
        attr = attr.split(';')
        attr.pop()
          //根据id判断是新建还是编辑
        let res
        if (id) {   
          res = await updateStore({ id, name, icon, attr, category })
        } else {
          res = await saveStore({ name, icon, attr, category })
        }
        // 该铭文已存在
        if (res.status == 1) {
          this.$message.error(res.msg)
          return
        }
        this.$message.success(res.msg)
        this.$router.push('/goods/storeList')
      },
      // 获取铭文二级分类
      async fetchStoreTwo () {
        const res = await fetchStoreTwo()
        this.storeCate = res.data
      },
      // 获取铭文详情
      async getStoreItem () {
        const res = await fetchStoreItem({ id: this.id })
        let attrStr = ''
        res.data.attr.forEach(item => {
          attrStr += item + ';'
        })
        this.model.name = res.data.name
        this.model.icon = res.data.icon
        this.model.attr = attrStr
        this.model.category = res.data.category
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable.styl"
  #store-edit
    .box-card
      width: 700px
      box-shadow: none
      .title, .el-select, .el-input
        margin-bottom: 30px
      .title
        font-size: $font-s
      .el-input
        width: 80% 
      .save
        margin-top: 30px

</style>