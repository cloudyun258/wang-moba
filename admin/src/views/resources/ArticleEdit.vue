<template>
  <div id="article-edit">
    <el-card class="box-card">
      <h1 class="title">{{ id ? '编辑' : '新建' }}文章</h1>
      <el-form label-position="right" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="model.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <el-select v-model="model.categories" multiple placeholder="请选择">
            <el-option
              v-for="item in articleCate"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option>
          </el-select>        
        </el-form-item>
        <el-form-item label="热门">
          <el-switch v-model="model.hot"></el-switch>
        </el-form-item>
        <el-form-item label="详情">
          <vue-editor 
            v-model="model.body"
            useCustomImageHandler 
            @image-added="handleImageAdded">
          </vue-editor>
        </el-form-item>
      </el-form>
      <div class="save">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { fetchArticleTwo, saveArticle, 
  updateArticle, uploadEditorFile, fetchArticleItem } from '@/api/resource'
  import { VueEditor } from "vue2-editor"
  export default {
    name: 'ArticleEdit',
    props: ['id'],
    data () {
      return {
        model: {
          title: '',
          body: '',
          hot: false,
          categories: []
        },
        articleCate: []
      }
    },
    watch: {
      $route () {
        if (this.id) {
          this.fetchArticleItem()
        } else {
          this.model.title = ''
          this.model.body = ''
          this.model.categories = []
          this.model.hot = false
        }
      }
    },
    mounted () {
      this.fetchArticleTwo()
      this.id && this.fetchArticleItem()
    },
    methods: {
      // 保存文章
      async save () {
        const { title, body, categories, hot } = this.model
        const id = this.id
        // 名字不能为空
        if (!title) {   
          this.$message.error('文章标题不能为空')
          return
        }
        if (!categories.length) {   
          this.$message.error('至少要选择一个分类')
          return
        }
        if (!body) {
          this.$message.error('文章详情不能为空')
          return
        }
         //根据id判断是新建还是编辑
        let res
        if (id) {   
          res = await updateArticle({ id, title, body, categories, hot })
        } else {
          res = await saveArticle({ title, body, categories, hot })
        }
        // 该文章已存在
        if (res.status == 1) {
          this.$message.error(res.msg)
          return
        }
        this.$message.success(res.msg)
        this.$router.push('/resource/articleList')
      },
      // 获取文章二级分类
      async fetchArticleTwo () {
        const res = await fetchArticleTwo()
        this.articleCate = res.data
      },
      // 获取文章详情
      async fetchArticleItem () {
        const res = await fetchArticleItem({ id: this.id })
        this.model = res.data
      },
      // 富文本文件上传
      async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
        
        const formData = new FormData()
        formData.append('file', file)

        const res = await uploadEditorFile(formData)
        Editor.insertEmbed(cursorLocation, 'image', res.data.url);
        resetUploader()  
      }   
    },
    components: {
      VueEditor
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable.styl"
  #article-edit
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