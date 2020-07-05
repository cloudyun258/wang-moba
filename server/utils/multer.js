const multer = require('multer')
const path = require('path')

function hangleMulter () {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // 根据上传的mimitype字段判断上传的是图片还是视频
      file.pathUrl = 'upload/images'
      if (file.mimetype.indexOf('video') != -1) {
        file.pathUrl = 'upload/video'
      }
      cb(null, path.join(__dirname, '../', file.pathUrl))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +  file.originalname);
    }
  })
  const upload = multer({ storage })

  return upload
  
}

module.exports =  hangleMulter