const BaseDao = require('../BaseDao')

// 查询某个活动的所有成员
const activityIdAllMember = (activityId) => {
  const sql =
    'select user.*,activity_member.* from activity_member left join user on activity_member.user_id=user.user_id where activity_id=?'
  const params = [activityId]
  return BaseDao.execute(sql, params)
}
// 查询某个活动的所有成员 模糊查询
const searchActivityMember = (activityId, keywords) => {
  const sql =
    'select user.*,activity_member.* from activity_member left join user on activity_member.user_id=user.user_id \
  where activity_id=? and CONCAT_WS("",user_name,phone) REGEXP ?'
  const params = [activityId, keywords]
  return BaseDao.execute(sql, params)
}
// 查询活动内的某个用户
const activityIdMember = (activityId, phone) => {
  const sql =
    'select user.*,bear_name,appraise,join_time from activity_member left join user on activity_member.user_id=user.user_id \
    where activity_id=? and user.phone=?'
  const params = [activityId, phone]
  return BaseDao.execute(sql, params)
}
// 添加活动成员
const addMember = (member) => {
  const arr = [
    {
      sql: 'insert into activity_member(user_id,activity_id,bear_name,appraise,join_time) values(?,?,?,?,?)',
      params: [member.userId, member.activityId, member.bearName, member.appraise, member.joinTime],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 更新成员职位
const updateMemberBear = (member) => {
  const arr = [
    {
      sql: 'update activity_member set bear_name=? where user_id=? and activity_id=?',
      params: [member.bearName, member.userId, member.activityId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 删除活动成员
const deleteMember = (userId, activityId) => {
  const arr = [
    {
      sql: 'delete from activity_member where user_id=? and activity_id=?',
      params: [userId, activityId],
    },
  ]
  return BaseDao.execTransection(arr)
}

module.exports = {
  activityIdAllMember,
  searchActivityMember,
  activityIdMember,
  addMember,
  updateMemberBear,
  deleteMember,
}
