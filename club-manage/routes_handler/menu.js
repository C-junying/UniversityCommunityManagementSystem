// promise错误可以让app.js接收
require('express-async-errors');

// 引入数据操作
const menuDao = require('../dao/MenuDao');
const { menuOrderTree } = require('../utils/tree');
const { uuid } = require('../utils/myStr');

// 获取所有菜单,树化
exports.roleSelect = async (req, res) => {
  // 调用dao获取数据
  let ret = await menuDao.roleSelect();
  // 把数据树化
  let tree = menuOrderTree(ret);
  res.json({ code: 200, data: tree });
};
// 根据token角色获得菜单
exports.menuTokenList = async (req, res) => {
  // 调用dao获取数据
  let ret = await menuDao.queryByRoleId(req.auth.roleId);
  // 把数据树化
  let tree = menuOrderTree(ret);
  res.json({ code: 200, data: tree });
};

//根据roleId角色获得菜单
exports.roleIdMenu = async (req, res) => {
  let role = req.body || req.params;
  // 调用dao获取数据
  let ret = await menuDao.queryByRoleId(role.roleId);
  res.json({ code: 200, data: ret });
};

// 分页菜单列表
exports.getListByPage = async (req, res) => {
  let page = req.body || req.params;
  // 调用dao获取数据
  let count = await menuDao.getCount();
  let ret = await menuDao.getListByPage(page);
  res.json({ code: 200, data: { count: count[0].count, list: ret } });
};
// 对菜单ID，菜单名称，菜单路径模糊查询
exports.search = async (req, res) => {
  let keywords = req.body || req.params;
  let ret = await menuDao.getSearch(keywords);
  res.json({ code: 200, data: ret });
};
// 添加菜单
exports.addMenu = async (req, res) => {
  let menu = req.body || req.params;
  console.log('添加菜单:', menu);
  menu.menuId = uuid();
  let ret = await menuDao.addMenu(menu);
  res.json({ code: 200, data: ret, msg: '添加菜单成功' });
};
// 编辑菜单
exports.updateMenu = async (req, res) => {
  let menu = req.body || req.params;
  let ret = await menuDao.updateMenu(menu);
  res.json({ code: 200, data: ret, msg: '编辑菜单成功' });
};
// 删除菜单
exports.deleteMenu = async (req, res) => {
  let menu = req.body || req.params;
  // console.log(menu)
  let ret = await menuDao.deleteMenu(menu);
  res.json({ code: 200, data: ret, msg: '删除菜单成功' });
};
