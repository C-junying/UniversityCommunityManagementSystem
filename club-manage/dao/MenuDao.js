const BaseDao = require('./BaseDao')

//通过roleId获取菜单列表
const queryByRoleId = (roleId) => {
  const sql =
    'SELECT menu_role.role_id,menu.* FROM menu_role,menu\
    where menu_role.menu_id = menu.menu_id and menu_role.role_id = ?'
  const params = [roleId]
  return BaseDao.execute(sql, params)
}
// 查询菜单总数
const getCount = () => {
  const sql = 'SELECT count(*) as count FROM menu'
  return BaseDao.execute(sql)
}
// 获取菜单所有菜单
const roleSelect = () => {
  const sql = 'select * from menu'
  return BaseDao.execute(sql)
}
// 获取菜单列表,分页
const getListByPage = (pageNum, pageSize) => {
  const sql = 'select * from menu limit ?,?'
  const params = [(pageNum - 1) * pageSize, pageSize]
  return BaseDao.execute(sql, params)
}
// 获取所有一级二级菜单
// const queryAll = () => {
//   const sql = 'select * from menu where menuType=0'
//   return BaseDao.execute(sql)
// }
// 对菜单ID，菜单名称，菜单路径模糊查询
const getSearch = (keywords) => {
  const sql = 'select * from menu where CONCAT(menu_id,name,href) like ?'
  const params = ['%' + keywords.search + '%']
  return BaseDao.execute(sql, params)
}
// 添加菜单
const addMenu = (menu) => {
  const arr = [
    {
      sql: 'insert into menu(menu_id,name,href,parent_id,sort,menu_logo,is_show,remarks) values(?,?,?,?,?,?,?,?)',
      params: [
        menu.menuId,
        menu.name,
        menu.href,
        menu.parentId,
        menu.sort,
        menu.menuLogo,
        menu.isShow,
        menu.remarks,
      ],
    },
    {
      sql: 'insert into menu_role(menu_id,role_id) values(?,?)',
      params: [menu.menuId, '202304191411040000'],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 编辑菜单
const updateMenu = (menu) => {
  const sql =
    'update menu set name=?,href=?,parent_id=?,sort=?,menu_logo=?,is_show=?,remarks=? where menu_id=?'
  const params = [
    menu.name,
    menu.href,
    menu.parentId,
    menu.sort,
    menu.menuLogo,
    menu.isShow,
    menu.remarks,
    menu.menuId,
  ]
  return BaseDao.execTransection([{ sql, params }])
}
// 删除菜单
const deleteMenu = (menu) => {
  const arr = [
    {
      sql: 'delete from menu_role where menu_id=?',
      params: [menu.menuId],
    },
    {
      sql: 'delete from menu where menu_id=?',
      params: [menu.menuId],
    },
  ]
  return BaseDao.execTransection(arr)
}
module.exports = {
  roleSelect,
  //   queryAll,
  queryByRoleId,
  getCount,
  getListByPage,
  getSearch,
  addMenu,
  updateMenu,
  deleteMenu,
}
