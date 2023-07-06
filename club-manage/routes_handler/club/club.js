// promise错误可以让app.js接收
require('express-async-errors')

// 引入数据操作
const clubDao = require('../../dao/club/ClubDao')
const areaDao = require('../../dao/AreaDao')
const memberDao = require('../../dao/club/ClubMemberDao')
const teacherDao = require('../../dao/TeacherDao')

// 生成16位UUID
const { uuid, getNowTime } = require('../../utils/myStr')

// 查看所有申请社团记录
exports.applyClubAll = async (req, res) => {
  let ret = await clubDao.applyClubAll()
  ret.sort((a, b) => b['apply_time'] - a['apply_time'])
  res.json({ code: 200, data: ret })
}
// 审核列表模糊查询
exports.searchApplyClub = async (req, res) => {
  let search = req.body || req.params
  let ret = await clubDao.searchApplyClub(search.keywords)
  ret.sort((a, b) => b['apply_time'] - a['apply_time'])
  res.json({ code: 200, data: ret })
}
// 查看当前用户有哪些申请社团记录
exports.userApplyClubAll = async (req, res) => {
  let ret = await clubDao.userApplyClubAll(req.auth.userId)
  ret.sort((a, b) => b['apply_time'] - a['apply_time'])
  res.json({ code: 200, data: ret })
}
// 查看apply_id的申请社团记录
exports.applyIdApplyClub = async (req, res) => {
  let apply = req.body || req.params
  let ret = await clubDao.applyIdApplyClub(apply.applyId)
  res.json({ code: 200, data: ret })
}

// 查看club_id的社团所有信息
exports.clubIdApplyClub = async (req, res) => {
  let club = req.body || req.params
  let ret = await clubDao.clubIdApplyClub(club.clubId)
  res.json({ code: 200, data: ret })
}
// 提交申请社团记录
exports.addApplyClub = async (req, res) => {
  // 获取数据
  let clubApply = req.body || req.params
  // 设置数据信息
  clubApply.applyInfo.applyId = uuid()
  clubApply.applyInfo.applyTime = getNowTime()
  clubApply.clubInfor.clubId = uuid()
  clubApply.clubInfor.bearName = '指导老师'
  // 判断场地是否可以用
  let flag = await areaDao.auditArea(clubApply.applyInfo.areaId)
  if (flag.length > 0) {
    res.json({ code: 3200, flag, msg: '场地已经被使用，请更换' })
  } else {
    // 占用场地
    const area = await areaDao.occupyArea(2, clubApply.applyInfo.areaId)
    // 执行申请社团
    const club = await clubDao.addApplyClub(clubApply.applyInfo, clubApply.clubInfor, req.auth)
    // 返回执行
    res.json({ code: 200, data: { area, club }, msg: '添加成功' })
  }
}
// 审核申请社团
exports.auditApplyClub = async (req, res) => {
  let apply = req.body || req.params
  // 记录时间
  apply.replyTime = getNowTime()
  // 执行审核
  let ret = await clubDao.auditApplyClub(apply)
  // 审核通过
  if (apply.applyState === 1) {
    await memberDao.addMember({
      userId: apply.userId,
      clubId: apply.clubId,
      bearName: '社长',
      contribute: '',
      joinTime: apply.replyTime,
    })
    res.json({ code: 200, data: ret, msg: '审核成功' })
    // 审核不通过
  } else {
    // 撤销之前社团占用的场地
    await areaDao.occupyArea(1, apply.areaId)
    res.json({ code: 3200, data: ret, msg: '驳回成功' })
  }
}
// 发布社团
exports.releaseClub = async (req, res) => {
  let club = req.body || req.params
  // 修改状态
  let ret = await clubDao.releaseClub(club.applyId, club.state)
  res.json({ code: 200, data: ret, msg: '发布成功' })
}
// 删除申请社团记录
exports.deleteApplyClub = async (req, res) => {
  const apply = req.body || req.params
  // 撤销占用场地
  await areaDao.occupyArea(1, apply.areaId)
  // 撤销申请社团
  await clubDao.deleteApplyClub(apply.applyId, apply.clubId)
  res.json({ code: 200, msg: '撤销成功' })
}
// 查询所有社团
exports.getClubsAll = async (req, res) => {
  let ret = await clubDao.getClubsAll()
  ret = ret.filter((item) => item.state >= 1)
  ret.sort((a, b) => b['reply_time'] - a['reply_time'])
  res.json({ code: 200, data: ret })
}
// 查询所有社团 模糊查询
exports.searchClubsAll = async (req, res) => {
  let { keywords } = req.body || req.params
  let ret = await clubDao.searchClubsAll(keywords)
  ret = ret.filter((item) => item.state >= 1)
  ret.sort((a, b) => b['reply_time'] - a['reply_time'])
  res.json({ code: 200, data: ret })
}
// 查询用户的社团
exports.getUserClubs = async (req, res) => {
  let ret = await clubDao.getUserClubs(req.auth.userId)
  ret = ret.filter((item) => item.state >= 1)
  res.json({ code: 200, data: ret })
}
// 查看club_id的社团信息
exports.clubIdClub = async (req, res) => {
  let club = req.body || req.params
  let ret = await clubDao.clubIdClub(club.clubId)
  res.json({ code: 200, data: ret })
}
// 更新社团
exports.updateClubInfo = async (req, res) => {
  let club = req.body || req.params
  let ret = await clubDao.updateClubInfo(club)
  res.json({ code: 200, data: ret, msg: '更新成功' })
}
// 查看社团有哪些成员
exports.getClubMember = async (req, res) => {
  let club = req.body || req.params
  // 获取社团成员信息
  let member = await clubDao.getClubMember(club.clubId)
  // 获取社团担任老师的信息
  let teacher = await teacherDao.clubIdTeacher(club.clubId)
  res.json({ code: 200, data: [...teacher, ...member] })
}
// 查看社团有哪些社团成员 模糊
exports.searchClubMember = async (req, res) => {
  let club = req.body || req.params
  let member = await clubDao.searchClubMember(club.clubId, club.keywords)
  let teacher = await teacherDao.searchClubIdTeacher(club.clubId, club.keywords)
  res.json({ code: 200, data: [...teacher, ...member] })
}
// 根据clubId和userId查看当前用户在社团担任什么职位
exports.clubIdUserIdToBearName = async (req, res) => {
  let club = req.body || req.params
  let member = await clubDao.memberClubIdUserIdToBearName(club.clubId, req.auth.userId)
  let taecher = await clubDao.teacherClubIdUserIdToBearName(club.clubId, req.auth.userId)
  res.json({ code: 200, data: { member, taecher } })
}
// 解散社团
exports.clubDisband = async (req, res) => {
  let club = req.body || req.params
  let ret = await clubDao.clubDisband(club.clubId)
  res.json({ code: 200, data: ret, msg: '解散成功' })
}
// 撤回解散
exports.alterclubDisband = async (req, res) => {
  let club = req.body || req.params
  let ret = await clubDao.alterclubDisband(club.clubId)
  res.json({ code: 200, data: ret, msg: '撤回解散成功' })
}
