<template>
  <div id="ads-edit">
    <el-form label-position="right" label-width="80px">
      <el-card class="box-card">
        <h1 class="title">{{ id ? '编辑' : '新建' }}广告位</h1>
        <el-input v-model="model.name" placeholder="请输入广告位名称" @keydown.native.enter="save"></el-input>
        <el-button type="primary" size="small" @click="addAd" style="margin-left: 119px">
          <i class="el-icon-plus" style="margin-right:5px"></i>添加广告项
        </el-button>
        <el-row>
          <el-col :md="24" v-for="(item, index) in model.items" :key="index" style="margin-top: 30px">
            <el-form-item label="链接(url)">
              <el-input v-model="item.url" placeholder="请输入图片跳转链接"></el-input> 
            </el-form-item>
            <el-form-item label="广告图">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :headers="uploadHeaders"
                :on-success="uploadAds">
                <img v-if="item.image" :src="item.image" class="banner">
                <i v-else class="el-icon-plus banner-uploader-icon" @click="uploadAdsIndex=index"></i>
              </el-upload>
            </el-form-item>
            <el-form-item style="text-align: right">
              <el-button type="danger" size="small" @click="delAd(index)">删除</el-button>
            </el-form-item>             
          </el-col>
        </el-row>
      </el-card>
    </el-form>
    <div class="save">
      <el-button type="primary" @click="save">保存</el-button>
    </div>    
  </div>
</template>

<script>
  import { fetchAdsItem, updateAds, saveAds } from '@/api/system'
  import mixins_upload from '@/assets/javascript/mixins_upload'
  export default {
    name: 'AdsEdit',
    mixins: [mixins_upload],
    props: ['id'],
    data () {
      return {
        model: {
          name: '',
          items: []
        },
        uploadAdsIndex: 0, // 用来标记上传的是哪个广告项的图片
      }
    },
    watch: {
      $route () {
        if (this.id) {
          this.fetchAdsItem()
        } else {
          this.model.name = ''
          this.model.items = []
        }
      }
    },    
    mounted () {
      this.id && this.fetchAdsItem()
    },
    methods: {
      // 保存广告位
      async save () {
        const { name, items } = this.model
        const id = this.id
        // 名字不能为空
        if (!name) {   
          this.$message.error('广告位名称不能为空')
          return
        }
        //根据id判断是新建还是编辑
        let res
        if (id) {   
          res = await updateAds({ id, name, items })
        } else {
          res = await saveAds({ name, items })
        }
        // 该广告位已存在
        if (res.status == 1) {
          this.$message.error(res.msg)
          return
        }
        this.$message.success(res.msg)
        this.$router.push('/system/adsList')
      },      
      // 获取广告位信息
      async fetchAdsItem () {
        const res = await fetchAdsItem({ id: this.id })
        this.model.name = res.data.name
        this.model.items = res.data.items
      },
      // 添加一个广告项
      addAd () {
        this.model.items.push({
          image: '',
          url: ''
        })
      },
      // 删除一个广告项
      delAd (index) {
        this.$confirm(`确认要删除该广告项?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 先前端删除数据，点保存时再提交
          this.model.items.splice(index, 1)
          this.$message.success('删除成功')
        })
      },
      // 文件上传成功的回调函数
      uploadAds (res) {
        this.model.items[this.uploadAdsIndex].image = res.data.url
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable.styl"
  #ads-edit
    .box-card
      width: 800px
      margin: 0 auto
      box-shadow: none
      .title, .el-input
        margin-bottom: 30px
      .title
        font-size: $font-s
      .el-input
        width: 70% 
      .save
        margin-top: 30px
    .el-form-item
      .el-input
        margin-bottom: 0
        width: 100% 
    .save
      width: 800px
      margin: 50px auto
      margin-top: 30px 
      text-align: right   
</style>