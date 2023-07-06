const BaseDao = require('../BaseDao')

// 查询所有活动类型
const activityTypeAll = () => {
  const sql = 'SELECT * FROM activity_type'
  return BaseDao.execute(sql)
}
// 查询所有活动类型  模糊查询
const activityTypeSearch = (search) => {
  const sql = 'select * from activity_type where CONCAT_WS("",type_name,type_content) REGEXP ?'
  const params = [search]
  return BaseDao.execute(sql, params)
}
// 查看是否有重名
const activityTypeRepeatName = (name) => {
  const sql = 'select * from activity_type where type_name = ?'
  const params = [name]
  return BaseDao.execute(sql, params)
}
// 添加活动类型
const addActivityType = (activityType) => {
  const arr = [
    {
      sql: 'insert into activity_type(type_id,type_name,type_content,picture) values(?,?,?,?)',
      params: [activityType.typeId, activityType.typeName, activityType.typeContent, activityType.picture],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 编辑活动类型
const updateActivityType = (activityType) => {
  const arr = [
    {
      sql: 'update activity_type set type_name=?,type_content=?,picture=? where type_id=?',
      params: [activityType.typeName, activityType.typeContent, activityType.picture, activityType.typeId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 删除活动类型
const deleteActivityType = (typeId) => {
  const arr = [
    {
      sql: 'delete from activity_type where type_id=?',
      params: [typeId],
    },
  ]
  return BaseDao.execTransection(arr)
}

module.exports = {
  activityTypeAll,
  activityTypeRepeatName,
  activityTypeSearch,
  addActivityType,
  updateActivityType,
  deleteActivityType,
}
