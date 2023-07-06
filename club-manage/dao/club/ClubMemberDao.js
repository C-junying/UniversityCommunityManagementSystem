const BaseDao = require('../BaseDao')

// 查询某个社团的所有成员
const clubIdAllMember = (clubId) => {
  const sql =
    'select user.*,bear_name,contribute,join_time from club_member left join user on club_member.user_id=user.user_id where club_id=?'
  const params = [clubId]
  return BaseDao.execute(sql, params)
}
// 查询社团内的某个用户
const clubIdMember = (clubId, phone) => {
  const sql =
    'select user.*,bear_name,contribute,join_time from club_member left join user on club_member.user_id=user.user_id \
    where club_id=? and user.phone=?'
  const params = [clubId, phone]
  return BaseDao.execute(sql, params)
}
// 添加社团成员
const addMember = (member) => {
  const arr = [
    {
      sql: 'insert into club_member(user_id,club_id,bear_name,contribute,join_time) values(?,?,?,?,?)',
      params: [member.userId, member.clubId, member.bearName, member.contribute, member.joinTime],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 更新成员职位
const updateMemberBear = (member) => {
  const arr = [
    {
      sql: 'update club_member set bear_name=? where user_id=? and club_id=?',
      params: [member.bearName, member.userId, member.clubId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 删除社团成员
const deleteMember = (userId, clubId) => {
  const arr = [
    {
      sql: 'delete from club_member where user_id=? and club_id=?',
      params: [userId, clubId],
    },
  ]
  return BaseDao.execTransection(arr)
}

module.exports = {
  clubIdAllMember,
  clubIdMember,
  addMember,
  updateMemberBear,
  deleteMember,
}
