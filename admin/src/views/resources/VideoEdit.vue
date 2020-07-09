<template>
  <div id="video-edit">
    <el-card class="box-card">
      <h1 class="title">{{ id ? '编辑' : '新建' }}视频</h1>
      <el-form label-position="right" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="model.title" placeholder="请输入视频标题"></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <el-select v-model="model.category" placeholder="请选择">
            <el-option
              v-for="item in videoCate"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option>
          </el-select>        
        </el-form-item>
        <el-form-item label="播放量">
          <el-input v-model="model.play" placeholder="请输入视频播放量"></el-input>
        </el-form-item>     
        <el-form-item label="封面">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :headers="uploadHeaders"
            :on-success="uploadVideo">
            <img v-if="model.cover" :src="model.cover" class="banner">
            <i v-else class="el-icon-plus banner-uploader-icon"></i>
          </el-upload>          
        </el-form-item>
        <el-form-item label="视频">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :headers="uploadHeaders"
            :on-success="uploadVideo">
            <video v-if="model.video" controls :src="model.video" class="banner"></video>
            <i v-else class="el-icon-plus banner-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="save">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { saveVideo, updateVideo, fetchVideoTwo, fetchVideoItem } from '@/api/resource'
  import mixins_upload from '@/assets/javascript/mixins_upload'
  export default {
    name: 'VideoEdit',
    mixins: [mixins_upload],
    props: ['id'],
    data () {
      return {
        model: {
          title: '',
          category: '',
          play: '',
          cover: '',
          video: ''
        },
        videoCate: [], // 视频分类
      }
    },
    watch: {
      $route () {
        if (this.id) {
          this.fetchVideoItem()
        } else {
          this.model.title = ''
          this.model.play = ''
          this.model.category = ''
          this.model.cover = ''
          this.video = ''
        }
      }
    },        
    mounted () {
      this.id && this.fetchVideoItem()
      this.fetchVideoTwo()
    },
    methods: {
      // 保存视频
      async save () {
        const { title, play, category, cover, video } = this.model
        const id = this.id
        // 名字不能为空
        if (!title || !play || !category || !cover || !video) {   
          this.$message.error('请将信息填写完整')
          return
        }
         //根据id判断是新建还是编辑
        let res
        if (id) {   
          res = await updateVideo({ id, title, play, category, cover, video })
        } else {
          res = await saveVideo({ title, play, category, cover, video })
        }
        // 该视频已存在
        if (res.status == 1) {
          this.$message.error(res.msg)
          return
        }
        this.$message.success(res.msg)
        this.$router.push('/resource/videoList')        
      },
      // 获取视频二级分类
      async fetchVideoTwo () {
        const res = await fetchVideoTwo()
        this.videoCate = res.data
      },
      // 获取视频详情
      async fetchVideoItem () {
        const res = await fetchVideoItem({ id: this.id })
        this.model = res.data        
      },
      // 上传文件成功后的回调函数
      uploadVideo (res) {
        res = res.data
        if (res.mimetype.indexOf('video') != -1) {
          this.model.video = res.url
        } else {
          this.model.cover = res.url
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable.styl"
  #video-edit
    .box-card
      width: 1000px
      margin: 0 auto
      box-shadow: none
      .title
        margin-bottom: 30px
        font-size: $font-s
      .el-form-item
        margin-bottom: 30px 
      .save
        text-align: right 
        margin-top: 30px
</style>