// promise错误可以让app.js接收
require('express-async-errors');

// 引入数据操作
const areaDao = require('../dao/AreaDao');
// 生成16位UUID
const { uuid, getNowTime } = require('../utils/myStr');

// 查询所有场地
exports.areaAll = async (req, res) => {
  let ret = await areaDao.areaAll();
  ret.sort((a, b) => a['area_name'].localeCompare(b['area_name']));
  res.json({ code: 200, data: ret });
};
// 查询所有场地,除去被禁用的场地
exports.areaStatusAll = async (req, res) => {
  let ret = await areaDao.areaAll();
  ret.sort((a, b) => a['area_name'].localeCompare(b['area_name']));
  let areaList = ret.filter((item) => item.status !== 0);
  res.json({ code: 200, data: areaList });
};
// 场地 模糊查询
exports.areaSearch = async (req, res) => {
  let area = req.body || req.params;
  let ret = await areaDao.areaSearch(area.keywords);
  res.json({ code: 200, data: ret });
};

// 添加场地
exports.addArea = async (req, res) => {
  let area = req.body || req.params;
  let flag = await areaDao.areaRepeatName(area.areaName);
  if (flag.length > 0) {
    res.json({ code: 3100, msg: '场地添加失败，场地名重复' });
    return;
  }
  // console.log('Hello');
  area.areaId = uuid();
  area.registTime = getNowTime();
  let ret = await areaDao.addArea(area);
  res.json({ code: 200, data: ret, msg: '场地添加成功' });
};
// 编辑场地
exports.updateArea = async (req, res) => {
  let area = req.body || req.params;
  let flag = await areaDao.areaRepeatName(area.areaName);
  if (flag.length > 0 && flag[0]['area_id'] !== area.areaId) {
    res.json({ code: 3100, msg: '场地更新失败，场地名重复' });
    return;
  }
  let ret = await areaDao.updateArea(area);
  res.json({ code: 200, data: ret, msg: '场地更新成功' });
};
// 删除场地
exports.deleteArea = async (req, res) => {
  let area = req.body || req.params;
  let ret = await areaDao.deleteArea(area.areaId);
  res.json({ code: 200, data: ret, msg: '场地删除成功' });
};
