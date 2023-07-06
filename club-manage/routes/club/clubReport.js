var express = require('express')
var router = express.Router()

// 导入路由处理函数
const reportHandle = require('../../routes_handler/club/clubReport')
// 查看当前社团有哪些学期报告
router.post('/clubIdReportAll', reportHandle.clubIdReportAll)
// 查看社团的某个报告
router.post('/lookClubIdReportId', reportHandle.lookClubIdReportId)
// 添加学期报告
router.post('/addReport', reportHandle.addReport)
// 删除学期报告
router.post('/deleteReport', reportHandle.deleteReport)
module.exports = router
