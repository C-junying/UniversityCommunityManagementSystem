const BaseDao = require('../BaseDao')

// 查询所有社团类型
const clubTypeAll = () => {
  const sql = 'SELECT * FROM club_type'
  return BaseDao.execute(sql)
}
// 查询所有社团类型 模糊查询
const clubTypeSearch = (search) => {
  const sql = 'select * from club_type where CONCAT_WS("",type_name,type_content) REGEXP ?'
  const params = [search]
  return BaseDao.execute(sql, params)
}
// 查看是否有重名
const clubTypeRepeatName = (name) => {
  const sql = 'select * from club_type where type_name = ?'
  const params = [name]
  return BaseDao.execute(sql, params)
}
// 添加社团类型
const addClubType = (clubType) => {
  const arr = [
    {
      sql: 'insert into club_type(type_id,type_name,type_content,picture) values(?,?,?,?)',
      params: [clubType.typeId, clubType.typeName, clubType.typeContent, clubType.picture],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 编辑社团类型
const updateClubType = (clubType) => {
  const arr = [
    {
      sql: 'update club_type set type_name=?,type_content=?,picture=? where type_id=?',
      params: [clubType.typeName, clubType.typeContent, clubType.picture, clubType.typeId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 删除社团类型
const deleteClubType = (typeId) => {
  const arr = [
    {
      sql: 'delete from club_type where type_id=?',
      params: [typeId],
    },
  ]
  return BaseDao.execTransection(arr)
}

module.exports = {
  clubTypeAll,
  clubTypeRepeatName,
  clubTypeSearch,
  addClubType,
  updateClubType,
  deleteClubType,
}
