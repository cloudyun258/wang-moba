<template>
  <div id="equip-edit">
    <el-card class="box-card">
      <h1 class="title">{{ id ? '编辑' : '新建' }}装备</h1>
      <el-input v-model="model.name" placeholder="请输入装备名称" @keydown.native.enter="save"></el-input>
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
  import { saveEquip, updateEquip, getEquipItem } from '@/api/goods' 
  import mixins_upload from '@/assets/javascript/mixins_upload'
  export default {
    name: 'EquipEdit',
    mixins: [mixins_upload],
    props: ['id'],
    data () {
      return {
        model: {  // 装备的名字和图片
          name: '',
          icon: ''
        }
      }
    },
    watch: {
      $route () {
        if (this.id) {
          this.getEquipItem()
        } else {
          this.model.name = ''
          this.model.icon = ''
        }
      }
    },
    mounted () {
      this.id && this.getEquipItem()
    },
    methods: {
      // 保存分类
      async save () {
        const { name, icon } = this.model
        const id = this.id
        // 名字不能为空
        if (!name) {   
          this.$message.error('装备名称不能为空')
          return
        }
        if (!icon) {
          this.$message.error('请先上传装备图片')
          return
        }
         //根据id判断是新建还是编辑
        let res
        if (id) {   
          res = await updateEquip({ id, name, icon })
        } else {
          res = await saveEquip({ name, icon })
        }
        // 该装备已存在
        if (res.status == 1) {
          this.$message.error(res.msg)
          return
        }
        this.$message.success(res.msg)
        this.$router.push('/goods/equipList')
      },
      // 获取装备详情
      async getEquipItem () {
        const res = await getEquipItem({ id: this.id })
        this.model.name = res.data.name
        this.model.icon = res.data.icon
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable.styl"
  #equip-edit
    .box-card
      width: 520px
      box-shadow: none
      .title, .el-input
        margin-bottom: 30px
      .title
        font-size: $font-s
      .el-input
        width: 70% 
      .save
        margin-top: 30px

</style>