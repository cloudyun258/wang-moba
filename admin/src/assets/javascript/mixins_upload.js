export default {
  computed: {
    // 文件上传地址
    uploadUrl () {
      return process.env.VUE_APP_BASE_API + '/upload/images'
    },
    // 文件上传时的请求头
    uploadHeaders () {
      return { 'Authorization': localStorage.getItem('token') || '' }
    }
  },
  methods: {
     // 文件上传成功的回调函数
    uploadSuccess (res) {
      this.model.icon = res.data.url
    }
  }
}