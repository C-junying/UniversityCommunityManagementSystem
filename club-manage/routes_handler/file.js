// promise错误可以让app.js接收
require('express-async-errors')

// 头像上传
exports.uploadHead = (req, res) => {
  var file = req.file
  //   console.log('文件类型：%s', file.mimetype)
  //   console.log('原始文件名：%s', file.originalname)
  //   console.log('文件大小：%s', file.size)
  //   console.log('文件保存路径：%s', file.path)
  console.log(file)
  res.json({ code: 200, data: { file, img: `http://localhost:8080/images/head/${file.originalname}` } })
}
// 社团类型上传
exports.uploadType = (req, res) => {
  var file = req.file
  console.log(file)
  res.json({ code: 200, data: { file, img: `http://localhost:8080/images/type/${file.originalname}` } })
}
// 社团logo图上传
exports.uploadClub = (req, res) => {
  var file = req.file
  console.log(file)
  res.json({ code: 200, data: { file, img: `http://localhost:8080/images/club/${file.originalname}` } })
}
// 活动logo图上传
exports.uploadActivity = (req, res) => {
  var file = req.file
  console.log(file)
  res.json({ code: 200, data: { file, img: `http://localhost:8080/images/activity/${file.originalname}` } })
}
// 文本里的图上传
exports.uploadText = (req, res) => {
  var file = req.file
  console.log(file)
  res.json({ code: 200, data: { file, img: `http://localhost:8080/images/text/${file.originalname}` } })
}
