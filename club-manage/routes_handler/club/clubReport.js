// promise错误可以让app.js接收
require('express-async-errors')

// 引入数据操作
const clubReportDao = require('../../dao/club/ClubReportDao')

// 生成16位UUID
const { uuid, getNowTime } = require('../../utils/myStr')

// 查看当前社团有哪些学期报告
exports.clubIdReportAll = async (req, res) => {
  let report = req.body || req.params
  let ret = await clubReportDao.clubIdReportAll(report.clubId)
  ret.sort((a, b) => b['create_time'] - a['create_time'])
  res.json({ code: 200, data: ret })
}
// 查看社团的某个报告
exports.lookClubIdReportId = async (req, res) => {
  let report = req.body || req.params
  let ret = await clubReportDao.lookClubIdReportId(report.clubId, report.reportId)
  res.json({ code: 200, data: ret })
}
// 添加学期报告
exports.addReport = async (req, res) => {
  let report = req.body || req.params
  report.reportId = uuid()
  report.createTime = getNowTime()
  let ret = await clubReportDao.addReport(report)
  res.json({ code: 200, data: ret, msg: '添加成功' })
}
// 删除学期报告
exports.deleteReport = async (req, res) => {
  let report = req.body || req.params
  let ret = await clubReportDao.deleteReport(report.reportId)
  res.json({ code: 200, data: ret, msg: '删除成功' })
}
