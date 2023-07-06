const BaseDao = require('./BaseDao')

// 查询所有场地
const areaAll = () => {
  const sql = 'SELECT * FROM area'
  return BaseDao.execute(sql)
}
// 查询所有场地  模糊查询
const areaSearch = (search) => {
  const sql = 'select * from area where CONCAT_WS("",area_name,remark) REGEXP ?'
  const params = [search]
  return BaseDao.execute(sql, params)
}
// 查看场地是否被使用
const auditArea = (areaId) => {
  const sql = 'select * from area where status!=1 and area_id=?'
  const params = [areaId]
  return BaseDao.execute(sql, params)
}
// 查看是否有重名
const areaRepeatName = (name) => {
  const sql = 'select * from area where area_name = ?'
  const params = [name]
  return BaseDao.execute(sql, params)
}
// 添加场地
const addArea = (area) => {
  const arr = [
    {
      sql: 'insert into area(area_id,area_name,status,regist_time,remark) values(?,?,?,?,?)',
      params: [area.areaId, area.areaName, area.status, area.registTime, area.remark],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 编辑场地
const updateArea = (area) => {
  const arr = [
    {
      sql: 'update area set area_name=?,status=?,regist_time=?,remark=? where area_id=?',
      params: [area.areaName, area.status, area.registTime, area.remark, area.areaId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 占用场地
const occupyArea = (status, areaId) => {
  const arr = [
    {
      sql: 'update area set status=? where area_id=?',
      params: [status, areaId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 删除场地
const deleteArea = (areaId) => {
  const arr = [
    {
      sql: 'delete from area where area_id=?',
      params: [areaId],
    },
  ]
  return BaseDao.execTransection(arr)
}

module.exports = {
  areaAll,
  areaRepeatName,
  auditArea,
  areaSearch,
  addArea,
  updateArea,
  occupyArea,
  deleteArea,
}
