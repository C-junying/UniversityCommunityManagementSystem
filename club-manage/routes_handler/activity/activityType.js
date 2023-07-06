// promise错误可以让app.js接收
require('express-async-errors');

// 引入数据操作
const activityTypeDao = require('../../dao/activity/ActivityTypeDao');
// 生成16位UUID
const { uuid } = require('../../utils/myStr');

// 查询所有活动类型
exports.activityTypeAll = async (req, res) => {
  let ret = await activityTypeDao.activityTypeAll();
  res.json({ code: 200, data: ret });
};
// 活动类型 模糊查询
exports.activityTypeSearch = async (req, res) => {
  let activityType = req.body || req.params;
  let ret = await activityTypeDao.activityTypeSearch(activityType.keywords);
  res.json({ code: 200, data: ret });
};

// 添加活动类型
exports.addActivityType = async (req, res) => {
  let activityType = req.body || req.params;
  let flag = await activityTypeDao.activityTypeRepeatName(activityType.typeName);
  if (flag.length > 0) {
    res.json({ code: 3100, msg: '活动类型添加失败，活动类型名重复' });
    return;
  }
  activityType.typeId = uuid();
  let ret = await activityTypeDao.addActivityType(activityType);
  res.json({ code: 200, data: ret, msg: '活动类型添加成功' });
};
// 编辑活动类型
exports.updateActivityType = async (req, res) => {
  let activityType = req.body || req.params;
  let flag = await activityTypeDao.activityTypeRepeatName(activityType.typeName);
  if (flag.length > 0 && flag[0]['type_id'] !== activityType.typeId) {
    res.json({ code: 3100, msg: '活动类型更新失败，活动类型名重复' });
    return;
  }
  let ret = await activityTypeDao.updateActivityType(activityType);
  res.json({ code: 200, data: ret, msg: '活动类型更新成功' });
};
// 删除活动类型
exports.deleteActivityType = async (req, res) => {
  let activityType = req.body || req.params;
  let ret = await activityTypeDao.deleteActivityType(activityType.typeId);
  res.json({ code: 200, data: ret, msg: '活动类型删除成功' });
};
