// promise错误可以让app.js接收
require('express-async-errors');

// 引入数据操作
const activityDao = require('../../dao/activity/ActivityDao');
const clubDao = require('../../dao/club/ClubDao');
const areaDao = require('../../dao/AreaDao');
const memberDao = require('../../dao/activity/ActivityMemberDao');
const costDao = require('../../dao/CostDao');
const teacherDao = require('../../dao/TeacherDao');
// 生成16位UUID
const { uuid, getNowTime } = require('../../utils/myStr');
const { toHump } = require('../../utils/toHump');

// 查看所有申请活动记录
exports.applyActivityAll = async (req, res) => {
  let ret = await activityDao.applyActivityAll();
  ret.sort((a, b) => b['apply_time'] - a['apply_time']);
  res.json({ code: 200, data: ret });
};
// 审核列表模糊查询
exports.searchApplyActivity = async (req, res) => {
  let search = req.body || req.params;
  let ret = await activityDao.searchApplyActivity(search.keywords);
  ret.sort((a, b) => b['apply_time'] - a['apply_time']);
  res.json({ code: 200, data: ret });
};

// 查看当前社团有哪些活动申请
exports.clubApplyActivityAll = async (req, res) => {
  let club = req.body || req.params;
  let ret = await activityDao.clubApplyActivityAll(club.clubId);
  ret.sort((a, b) => b['apply_time'] - a['apply_time']);
  res.json({ code: 200, data: ret });
};
// 查看activity_id的申请活动记录
exports.activityIdApplyActivity = async (req, res) => {
  let activity = req.body || req.params;
  let ret = await activityDao.activityIdApplyActivity(activity.activityId);
  res.json({ code: 200, data: ret });
};
// 提交申请活动
exports.addActivityApply = async (req, res) => {
  // 获取数据
  let activityApply = req.body || req.params;
  // 添加数据
  activityApply.applyInfo.applyId = uuid();
  activityApply.applyInfo.applyTime = getNowTime();
  activityApply.activityInfor.activityId = uuid();
  activityApply.activityInfor.bearName = '指导老师';
  activityApply.activityInfor.activityState = 0;
  //   判断社团金额是否足够
  let clubMoney = await clubDao.clubIdApplyClub(activityApply.activityInfor.clubId);
  if (clubMoney[0].money < activityApply.activityInfor.money) {
    res.json({ code: 3200, msg: '使用金额大于社团拥有的金额，请联系社长' });
    return;
  }
  // 判断场地是否可以用
  let flag = await areaDao.auditArea(activityApply.applyInfo.areaId);
  if (flag.length > 0) {
    res.json({ code: 3200, flag, msg: '场地已经被使用，请更换' });
  } else {
    // 占用场地
    const area = await areaDao.occupyArea(2, activityApply.applyInfo.areaId);
    // 执行申请活动
    const activity = await activityDao.addActivityApply(
      activityApply.applyInfo,
      activityApply.activityInfor,
      req.auth
    );
    // 返回执行
    res.json({ code: 200, data: { area, activity }, msg: '添加成功' });
  }
};
// 审核申请活动
exports.auditApplyActivity = async (req, res) => {
  let apply = req.body || req.params;
  // 记录时间
  apply.replyTime = getNowTime();
  let ret = await activityDao.auditApplyActivity(apply);
  if (apply.applyState === 1) {
    await memberDao.addMember({
      userId: apply.applyUser,
      activityId: apply.activityId,
      bearName: '活动负责人',
      appraise: '',
      joinTime: apply.replyTime,
    });
    let activtyInfo = await activityDao.activityIdApplyActivity(apply.activityId);
    activtyInfo = toHump(activtyInfo[0]);
    let clubInfo = await clubDao.clubIdClub(activtyInfo.clubId);
    let club = {
      clubId: activtyInfo.clubId,
      money: clubInfo[0].money - activtyInfo.money,
    };
    // 第一个是社团的支出
    // 第二个是活动
    let bill1 = [
      uuid(),
      activtyInfo.name,
      activtyInfo.clubId,
      activtyInfo.clubId,
      activtyInfo.applyUser,
      activtyInfo.activityId,
      apply.replyTime,
      '1',
      '支出',
      activtyInfo.applyContent,
    ];
    let bill2 = [
      uuid(),
      activtyInfo.name,
      activtyInfo.activityId,
      activtyInfo.clubId,
      activtyInfo.applyUser,
      activtyInfo.activityId,
      apply.replyTime,
      '1',
      '收入',
      activtyInfo.applyContent,
    ];
    let billList = [bill1, bill2];
    let projectList = [
      [uuid(), bill1[0], bill1[1], 1, activtyInfo.money],
      [uuid(), bill2[0], bill2[1], 1, activtyInfo.money],
    ];
    let result = await costDao.auditCostApplyPass(club, billList, projectList);
    res.json({ code: 200, data: result, msg: '审核通过' });
  } else {
    await areaDao.occupyArea(1, apply.areaId);
    res.json({ code: 3200, data: ret, msg: '驳回成功' });
  }
};
// 发布活动
exports.releaseActivity = async (req, res) => {
  let activity = req.body || req.params;
  let ret = await activityDao.releaseActivity(activity.activityId, getNowTime(), activity.activityState);
  res.json({ code: 200, data: ret, msg: '发布成功' });
};
// 删除申请活动记录
exports.deleteApplyActivity = async (req, res) => {
  const apply = req.body || req.params;
  // 撤销占用场地
  await areaDao.occupyArea(1, apply.areaId);
  // 撤销申请活动
  await activityDao.deleteApplyActivity(apply.applyId, apply.activityId);
  res.json({ code: 200, msg: '撤销成功' });
};
// 所有活动
exports.getManageActivityAll = async (req, res) => {
  let ret = await activityDao.getManageActivityAll();
  ret.sort((a, b) => b['apply_time'] - a['apply_time']);
  res.json({ code: 200, data: ret });
};
// 查看活动 模糊查询
exports.searchActivity = async (req, res) => {
  let { keywords } = req.body || req.params;
  let ret = await activityDao.searchActivity(keywords);
  ret.sort((a, b) => b['apply_time'] - a['apply_time']);
  res.json({ code: 200, data: ret });
};
// 全校活动
exports.getActivityAll = async (req, res) => {
  let ret = await activityDao.getActivityAll();
  ret.sort((a, b) => b['apply_time'] - a['apply_time']);
  res.json({ code: 200, data: ret });
};
// 查看activityId的活动信息
exports.activityIdInfo = async (req, res) => {
  let activity = req.body || req.params;
  let ret = await activityDao.activityIdInfo(activity.activityId);
  res.json({ code: 200, data: ret });
};
// 社团活动
exports.getClubActivityAll = async (req, res) => {
  let club = req.body || req.params;
  let ret = await activityDao.getClubActivityAll(club.clubId);
  ret.sort((a, b) => b['apply_time'] - a['apply_time']);
  res.json({ code: 200, data: ret });
};
// 用户参加的活动
exports.getUserActivityAll = async (req, res) => {
  let ret = await activityDao.getUserActivityAll(req.auth);
  ret.sort((a, b) => b['start_time'] - a['start_time']);
  res.json({ code: 200, data: ret });
};
// 根据activityId和userId查看当前用户在社团担任什么职位
exports.activityIdUserIdToBearName = async (req, res) => {
  let activity = req.body || req.params;
  let member = await activityDao.memberActivityIdUserIdToBearName(activity.activityId, req.auth.userId);
  let taecher = await activityDao.teacherActivityIdUserIdToBearName(activity.activityId, req.auth.userId);
  res.json({ code: 200, data: { member, taecher } });
};
// 查看活动有哪些活动成员
exports.getActivityMember = async (req, res) => {
  let activity = req.body || req.params;
  let member = await memberDao.activityIdAllMember(activity.activityId);
  let teacher = await teacherDao.clubIdTeacher(activity.activityId);
  res.json({ code: 200, data: [...teacher, ...member] });
};
// 查看活动有哪些活动成员 模糊
exports.searchActivityMember = async (req, res) => {
  let activity = req.body || req.params;
  let member = await memberDao.searchActivityMember(activity.activityId, activity.keywords);
  let teacher = await teacherDao.searchClubIdTeacher(activity.activityId, activity.keywords);
  res.json({ code: 200, data: [...teacher, ...member] });
};
// 查某个活动的所有活动阶段
exports.getActivityStage = async (req, res) => {
  let activity = req.body || req.params;
  let ret = await activityDao.getActivityStage(activity.activityId);
  ret.sort((a, b) => a['start_time'] - b['start_time']);
  res.json({ code: 200, data: ret });
};
// 查活动阶段信息
exports.getStageInfo = async (req, res) => {
  let stage = req.body || req.params;
  let ret = await activityDao.getStageInfo(stage.stageId);
  res.json({ code: 200, data: ret });
};
// 添加活动阶段
exports.addActivityStage = async (req, res) => {
  let activity = req.body || req.params;
  activity.stageId = uuid();
  let ret = await activityDao.addActivityStage(activity);
  res.json({ code: 200, data: ret, msg: '添加成功' });
};
// 删除活动阶段
exports.deleteActivityStage = async (req, res) => {
  let activity = req.body || req.params;
  let ret = await activityDao.deleteActivityStage(activity);
  res.json({ code: 200, data: ret, msg: '删除成功' });
};
// 提交活动总结
exports.addactivityReport = async (req, res) => {
  let activity = req.body || req.params;
  let ret = await activityDao.addactivityReport(activity);
  res.json({ code: 200, data: ret, msg: '提交成功' });
};
// 撤回活动总结
exports.alteractivityReport = async (req, res) => {
  let activity = req.body || req.params;
  let ret = await activityDao.alteractivityReport(activity);
  res.json({ code: 200, data: ret, msg: '撤回成功' });
};
