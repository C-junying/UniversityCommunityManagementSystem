// promise错误可以让app.js接收
require('express-async-errors');

// 引入数据操作
const clubTypeDao = require('../../dao/club/ClubTypeDao');
// 生成16位UUID
const { uuid } = require('../../utils/myStr');

// 查询所有社团类型
exports.clubTypeAll = async (req, res) => {
  let ret = await clubTypeDao.clubTypeAll();
  ret.sort((a, b) => a['type_name'].localeCompare(b['type_name']));
  res.json({ code: 200, data: ret });
};
// 社团类型 模糊查询
exports.clubTypeSearch = async (req, res) => {
  let clubType = req.body || req.params;
  let ret = await clubTypeDao.clubTypeSearch(clubType.keywords);
  res.json({ code: 200, data: ret });
};

// 添加社团类型
exports.addClubType = async (req, res) => {
  let clubType = req.body || req.params;
  let flag = await clubTypeDao.clubTypeRepeatName(clubType.typeName);
  if (flag.length > 0) {
    res.json({ code: 3100, msg: '社团类型添加失败，社团类型名重复' });
    return;
  }
  clubType.typeId = uuid();
  let ret = await clubTypeDao.addClubType(clubType);
  res.json({ code: 200, data: ret, msg: '社团类型添加成功' });
};
// 编辑社团类型
exports.updateClubType = async (req, res) => {
  let clubType = req.body || req.params;
  let flag = await clubTypeDao.clubTypeRepeatName(clubType.typeName);
  if (flag.length > 0 && flag[0]['type_id'] !== clubType.typeId) {
    res.json({ code: 3100, msg: '社团类型更新失败，社团类型名重复' });
    return;
  }
  let ret = await clubTypeDao.updateClubType(clubType);
  res.json({ code: 200, data: ret, msg: '社团类型更新成功' });
};
// 删除社团类型
exports.deleteClubType = async (req, res) => {
  let clubType = req.body || req.params;
  let ret = await clubTypeDao.deleteClubType(clubType.typeId);
  res.json({ code: 200, data: ret, msg: '社团类型删除成功' });
};
