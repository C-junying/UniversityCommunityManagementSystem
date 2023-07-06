const BaseDao = require('./BaseDao')

// 查询所有角色
const roleList = () => {
  const sql = 'select * from role'
  return BaseDao.execute(sql)
}
// 查询角色总数
const getroleCount = () => {
  const sql = 'SELECT count(*) as count FROM role'
  return BaseDao.execute(sql)
}
// 查询所有角色,分页
const rolePageList = (pageNum, pageSize) => {
  const sql = 'select * from role limit ?,?'
  const params = [(pageNum - 1) * pageSize, pageSize]
  return BaseDao.execute(sql, params)
}
// 对角色名，备注模糊查询
const getSearch = (keywords) => {
  const sql = 'select * from role where CONCAT(role_name,remark) like ?'
  const params = ['%' + keywords.search + '%']
  return BaseDao.execute(sql, params)
}
// 添加角色
const addRole = (role) => {
  const sql = 'insert into role(role_id,role_name,role_logo,`rank`,remark) values(?,?,?,?,?)'
  const params = [role.roleId, role.roleName, role.logo, role.rank, role.remark]
  return BaseDao.execute(sql, params)
}
// 修改角色信息
const updateRole = (role) => {
  const sql = 'update role set role_name=?,role_logo=?,`rank`=?,remark=? where role_id=?'
  const params = [role.roleName, role.logo, role.rank, role.remark, role.roleId]
  return BaseDao.execute(sql, params)
}
// 删除角色
const deleteRole = (role) => {
  const arr = [
    {
      sql: 'delete from play_role where role_id=?',
      params: [role.roleId],
    },
    {
      sql: 'delete from menu_role where role_id=?',
      params: [role.roleId],
    },
    {
      sql: 'delete from role where role_id=?',
      params: [role.roleId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 分配角色权限
const shareRolePower = (role) => {
  const temp = role.roleMenuIdArr.map((val) => {
    return [val, role.roleId]
  })
  const arr = [
    {
      sql: 'delete from menu_role where role_id=?',
      params: [role.roleId],
    },
    {
      sql: `insert into menu_role(menu_id,role_id) values ?`,
      params: [temp],
    },
  ]
  return BaseDao.execTransection(arr)
}
module.exports = {
  roleList,
  getroleCount,
  rolePageList,
  getSearch,
  addRole,
  updateRole,
  deleteRole,
  shareRolePower,
}
