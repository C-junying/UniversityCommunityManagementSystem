const multer = require('multer')
const fs = require('fs')
//头像文件夹路径
// const fileUrl = './public/images/head'

const createFolder = function (folder) {
  try {
    fs.accessSync(folder)
  } catch (e) {
    fs.mkdirSync(folder)
  }
}
function useStorage(fileURL) {
  const storage = multer.diskStorage({
    // 上传文件的目录
    destination: function (req, file, cb) {
      cb(null, fileURL)
    },
    // 上传文件的名称
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
  })
  // 创建文件夹
  createFolder(fileURL)
  return multer({ storage })
}

// 头像上传
const uploadHead = useStorage('./public/images/head')
// 社团类型图上传
const uploadType = useStorage('./public/images/type')
// 社团logo图上传
const uploadClub = useStorage('./public/images/club')
// 活动logo图上传
const uploadActivity = useStorage('./public/images/activity')
// 文本里的图上传
const uploadText = useStorage('./public/images/text')
module.exports = { uploadHead, uploadType, uploadText, uploadClub, uploadActivity }
