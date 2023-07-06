const express = require('express')
var router = express.Router()

var { uploadHead, uploadType, uploadText, uploadClub, uploadActivity } = require('../dao/FileDao')
// 导入路由处理函数
const fileHandle = require('../routes_handler/file')
// 头像上传
router.post('/uploadHead', uploadHead.single('file'), fileHandle.uploadHead)
// 社团类型图上传
router.post('/uploadType', uploadType.single('file'), fileHandle.uploadType)
// 社团logo图上传
router.post('/uploadClub', uploadClub.single('file'), fileHandle.uploadClub)
// 活动logo图上传
router.post('/uploadActivity', uploadActivity.single('file'), fileHandle.uploadActivity)
// 文本里的图上传
router.post('/uploadText', uploadText.single('file'), fileHandle.uploadText)
module.exports = router
