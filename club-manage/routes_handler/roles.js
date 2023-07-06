// promise错误可以让app.js接收
require('express-async-errors')

// 路由处理函数
const roleDao = require('../dao/RoleDao')
const { uuid } = require('../utils/myStr')

// 查询所有角色
exports.roleList = async (req, res) => {
  let ret = await roleDao.roleList()
  ret.sort((a, b) => a.rank - b.rank)
  res.json({ code: 200, data: ret })
}
// 角色列表,分页
exports.getListByPage = async (req, res) => {
  let page = req.body || req.params
  // 调用dao获取数据
  let count = await roleDao.getroleCount()
  let ret = await roleDao.rolePageList(page.pageNum, page.pageSize)
  res.json({ code: 200, data: { count: count[0].count, list: ret } })
}
// 对角色名，备注模糊查询
exports.search = async (req, res) => {
  let keywords = req.body || req.params
  let ret = await roleDao.getSearch(keywords)
  ret.sort((a, b) => a.rank - b.rank)
  res.json({ code: 200, data: ret })
}
// 添加角色
exports.addRole = async (req, res) => {
  let role = req.body || req.params
  role.roleId = uuid()
  let ret = await roleDao.addRole(role)
  res.json({ code: 200, data: ret, msg: '添加角色成功' })
}
// 修改角色信息
exports.updateRole = async (req, res) => {
  let role = req.body || req.params
  let ret = await roleDao.updateRole(role)
  res.json({ code: 200, data: ret, msg: '编辑角色成功' })
}
// 删除角色
exports.deleteRole = async (req, res) => {
  let role = req.body || req.params
  let ret = await roleDao.deleteRole(role)
  res.json({ code: 200, data: ret, msg: '删除角色成功' })
}
// 分配角色权限
exports.shareRolePower = async (req, res) => {
  let role = req.body || req.params
  role.roleMenuIdArr = Array.from(role.roleMenuIdArr)
  // 先删除角色所有权限
  // 然后赋予角色相应权限
  let ret = await roleDao.shareRolePower(role)
  res.json({ code: 200, data: ret, msg: '分配角色权限成功' })
}
