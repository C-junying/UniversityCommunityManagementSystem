// promise错误可以让app.js接收
require('express-async-errors')

// 引入数据操作
const memberDao = require('../../dao/club/ClubMemberDao')
const { getNowTime } = require('../../utils/myStr')
const { checkPhoneName, login } = require('../../dao/UserDao')
const { clubIdTeacherPhone } = require('../../dao/TeacherDao')

// 查询某个社团的所有成员
exports.clubIdAllMember = async (req, res) => {
  let member = req.body || req.params
  let ret = await memberDao.clubIdAllMember(member.clubId)
  res.json({ code: 200, data: ret })
}
// 添加社团成员
exports.addMember = async (req, res) => {
  let member = req.body || req.params
  member.joinTime = getNowTime()
  // 检测是否有这个人
  const check = await checkPhoneName(member.userName, member.phone)
  if (check.length > 0) {
    // 检查成员
    const checkMember = await memberDao.clubIdMember(member.clubId, member.phone)
    // 检查老师
    const checkTeacher = await clubIdTeacherPhone(member.clubId, member.phone)
    if (checkMember.length === 0 && checkTeacher.length === 0) {
      let user = await login({ phone: member.phone })
      member.userId = user[0]['user_id']
      let ret = await memberDao.addMember(member)
      res.json({ code: 200, data: ret, msg: '添加成功' })
    } else if (checkMember.length > 0 || checkTeacher.length > 0) {
      res.json({ code: 3200, msg: '社团已经拥有该成员' })
    }
  } else {
    res.json({ code: 3200, msg: '不存在该用户' })
  }
}
// 加入社团
exports.userJoinMember = async (req, res) => {
  let member = req.body || req.params
  member.userId = req.auth.userId
  member.bearName = '成员'
  member.joinTime = getNowTime()
  let ret = await memberDao.addMember(member)
  res.json({ code: 200, data: ret, msg: '加入成功' })
}
// 更新成员职位
exports.updateMemberBear = async (req, res) => {
  let member = req.body || req.params
  let ret = await memberDao.updateMemberBear(member)
  res.json({ code: 200, data: ret, msg: '更改成功' })
}
// 删除社团成员
exports.deleteMember = async (req, res) => {
  let member = req.body || req.params
  let ret = await memberDao.deleteMember(member.userId, member.clubId)
  res.json({ code: 200, data: ret, msg: '删除成功' })
}
