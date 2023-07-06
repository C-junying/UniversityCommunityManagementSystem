const BaseDao = require('../BaseDao');

// 查看所有申请活动记录
const applyActivityAll = () => {
  const sql =
    'select apply.*,club_name,activity.*,user_name,phone \
      from activity left join apply on activity.apply_id = apply.apply_id left join club on activity.club_id=club.club_id\
      left join user on apply.apply_user = user.user_id';
  return BaseDao.execute(sql);
};
// 审核列表模糊查询
const searchApplyActivity = (keywords) => {
  const sql =
    'select apply.*,club_name,activity.*,user_name,phone \
    from activity left join apply on activity.apply_id = apply.apply_id left join club on activity.club_id=club.club_id\
    left join user on apply.apply_user = user.user_id where CONCAT_WS("",apply.name,club_name,user_name,phone) REGEXP ?';
  const params = [keywords];
  return BaseDao.execute(sql, params);
};
// 查看当前社团有哪些活动申请
const clubApplyActivityAll = (clubId) => {
  const sql =
    'select apply.*,club_name,activity.*,user_name,phone \
    from activity left join apply on activity.apply_id = apply.apply_id left join club on activity.club_id=club.club_id\
    left join user on apply.apply_user = user.user_id where activity.club_id=?';
  const params = [clubId];
  return BaseDao.execute(sql, params);
};
// 查看activity_id的申请活动记录
const activityIdApplyActivity = (activityId) => {
  const sql =
    'select apply.*,activity.*,club_name,user_name,phone,area_name,type_name from activity left join apply on activity.apply_id=apply.apply_id \
      left join club on activity.club_id=club.club_id left join user on apply.apply_user=user.user_id left join area on apply.area_id=area.area_id \
      left join activity_type on activity.type_id=activity_type.type_id where activity.activity_id = ?';
  const params = [activityId];
  return BaseDao.execute(sql, params);
};
// 提交申请活动
const addActivityApply = (applyInfo, activityInfor, user) => {
  const arr = [
    {
      sql: 'insert into apply(apply_id,area_id,apply_user,name,apply_content,apply_time,apply_state) values(?,?,?,?,?,?,?)',
      params: [
        applyInfo.applyId,
        applyInfo.areaId,
        user.userId,
        activityInfor.activityTitle,
        applyInfo.applyContent,
        applyInfo.applyTime,
        applyInfo.applyState,
      ],
    },
    {
      sql: 'insert into activity(activity_id,apply_id,type_id,club_id,activity_title,picture,activity_intro,\
        activity_content,start_time,end_time,money,activity_look,activity_state) values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
      params: [
        activityInfor.activityId,
        applyInfo.applyId,
        activityInfor.typeId,
        activityInfor.clubId,
        activityInfor.activityTitle,
        activityInfor.picture,
        activityInfor.activityIntro,
        activityInfor.activityContent,
        activityInfor.startTime,
        activityInfor.endTime,
        activityInfor.money,
        activityInfor.activityLook,
        activityInfor.activityState,
      ],
    },
    {
      sql: 'insert into bear(bear_id,teacher_id,bear_name) values(?,?,?)',
      params: [activityInfor.activityId, activityInfor.teacherId, activityInfor.bearName],
    },
  ];
  return BaseDao.execTransection(arr);
};
// 审核申请活动
const auditApplyActivity = (applyActivity) => {
  const arr = [
    {
      sql: 'update apply set apply_state=?,reply=?,reply_time=? where apply_id=?',
      params: [applyActivity.applyState, applyActivity.reply, applyActivity.replyTime, applyActivity.applyId],
    },
  ];
  return BaseDao.execTransection(arr);
};
// 发布活动
const releaseActivity = (activityId, time, state) => {
  const arr = [
    {
      sql: 'update activity set release_time=?, activity_state=? where activity_id=?',
      params: [time, state, activityId],
    },
  ];
  return BaseDao.execTransection(arr);
};
// 删除申请社团记录
const deleteApplyActivity = (applyId, activityId) => {
  const arr = [
    {
      sql: 'delete from bear where bear_id=?',
      params: [activityId],
    },
    {
      sql: 'delete from activity where activity_id=?',
      params: [activityId],
    },
    {
      sql: 'delete from apply where apply_id=?',
      params: [applyId],
    },
  ];
  return BaseDao.execTransection(arr);
};
// 所有活动
const getManageActivityAll = () => {
  const sql =
    'select area.area_id,apply_time,area_name,club_name,activity.*,activity_type.type_name,activity_type.picture as type_picture \
  from activity left join apply on activity.apply_id = apply.apply_id left join area on apply.area_id=area.area_id \
   left join club on activity.club_id=club.club_id left join activity_type on activity.type_id=activity_type.type_id \
   where apply_state=1 and activity_state>=1 ';
  return BaseDao.execute(sql);
};
// 查看活动 模糊查询
const searchActivity = (keywords) => {
  const sql =
    'select area.area_id,apply_time,area_name,club_name,activity.*,activity_type.type_name,activity_type.picture as type_picture\
  from activity left join apply on activity.apply_id = apply.apply_id left join area on apply.area_id=area.area_id \
   left join club on activity.club_id=club.club_id left join activity_type on activity.type_id=activity_type.type_id \
  where apply_state=1 and activity_state>=1 and CONCAT_WS("",activity_title,club_name,type_name) REGEXP ?';
  const params = [keywords];
  return BaseDao.execute(sql, params);
};
// 全校活动
const getActivityAll = () => {
  const sql =
    'select area_id,club_name,apply_time,activity.*,activity_type.picture as type_picture \
  from activity left join apply on activity.apply_id = apply.apply_id left join club on activity.club_id=club.club_id\
  left join activity_type on activity.type_id=activity_type.type_id \
  where apply_state=1 and activity_state>=1 and activity_look=?';
  const params = ['000000'];
  return BaseDao.execute(sql, params);
};
// 社团活动
const getClubActivityAll = (clubId) => {
  const sql =
    'select area_id,club_name,apply_time,activity.*,activity_type.picture as type_picture,user_name,phone \
  from activity left join apply on activity.apply_id = apply.apply_id left join club on activity.club_id=club.club_id\
  left join activity_type on activity.type_id=activity_type.type_id \
  left join user on apply.apply_user = user.user_id where apply_state=1 and activity_state>=1 and activity.club_id=?';
  const params = [clubId];
  return BaseDao.execute(sql, params);
};
// 用户参加的活动
const getUserActivityAll = (user) => {
  const sql =
    'SELECT DISTINCT activity.*,activity_type.picture as type_picture FROM \
    activity LEFT JOIN activity_type on activity.type_id=activity_type.type_id \
    LEFT JOIN activity_member on activity.activity_id=activity_member.activity_id \
    LEFT JOIN bear on activity.activity_id=bear.bear_id \
    LEFT JOIN teacher on bear.teacher_id=teacher.teacher_id \
    where activity.activity_state>=1&&(activity_member.user_id=? || teacher.user_id=?)';
  const params = [user.userId, user.userId];
  return BaseDao.execute(sql, params);
};
// 查看activityId的活动信息
const activityIdInfo = (activityId) => {
  const sql = 'select * from activity where activity_id = ?';
  const params = [activityId];
  return BaseDao.execute(sql, params);
};
// 根据activityId和userId查看当前用户在社团担任什么职位 成员
const memberActivityIdUserIdToBearName = (activityId, userId) => {
  const sql = 'select * from activity_member where activity_id=? and user_id=?';
  const params = [activityId, userId];
  return BaseDao.execute(sql, params);
};
// 根据activityId和userId查看当前用户在社团担任什么职位 老师
const teacherActivityIdUserIdToBearName = (activityId, userId) => {
  const sql =
    'select * from bear left join teacher on bear.teacher_id=teacher.teacher_id where bear_id=? and user_id=?';
  const params = [activityId, userId];
  return BaseDao.execute(sql, params);
};
// 查某个活动的所有活动阶段
const getActivityStage = (activityId) => {
  const sql = 'select * from activity_stage where activity_id=?';
  const params = [activityId];
  return BaseDao.execute(sql, params);
};
// 查活动阶段信息
const getStageInfo = (stageId) => {
  const sql = 'select * from activity_stage where stage_id=?';
  const params = [stageId];
  return BaseDao.execute(sql, params);
};
// 添加活动阶段
const addActivityStage = (activity) => {
  const arr = [
    {
      sql: 'insert into activity_stage(stage_id,activity_id,stage_name,stage_content,start_time,end_time) values(?,?,?,?,?,?)',
      params: [
        activity.stageId,
        activity.activityId,
        activity.stageName,
        activity.stageContent,
        activity.startTime,
        activity.endTime,
      ],
    },
  ];
  return BaseDao.execTransection(arr);
};
// 删除活动阶段
const deleteActivityStage = (activity) => {
  const arr = [
    {
      sql: 'delete from activity_stage where stage_id=? and activity_id=?',
      params: [activity.stageId, activity.activityId],
    },
  ];
  return BaseDao.execTransection(arr);
};
// 提交活动总结
const addactivityReport = (activity) => {
  const arr = [
    {
      sql: 'update activity set activity_report=?,activity_state=2 where activity_id=?',
      params: [activity.activityReport, activity.activityId],
    },
    {
      sql: 'update area set status=1 where area_id in (select apply.area_id from activity \
        left join apply on activity.apply_id=apply.apply_id where activity_id=?)',
      params: [activity.activityId],
    },
  ];
  return BaseDao.execTransection(arr);
};
// 撤回活动总结
const alteractivityReport = (activity) => {
  const arr = [
    {
      sql: 'update activity set activity_report=?,activity_state=1 where activity_id=?',
      params: [null, activity.activityId],
    },
    {
      sql: 'update area set status=2 where area_id in (select apply.area_id from activity \
        left join apply on activity.apply_id=apply.apply_id where activity_id=?)',
      params: [activity.activityId],
    },
  ];
  return BaseDao.execTransection(arr);
};
module.exports = {
  applyActivityAll,
  searchApplyActivity,
  activityIdApplyActivity,
  clubApplyActivityAll,
  addActivityApply,
  auditApplyActivity,
  releaseActivity,
  deleteApplyActivity,
  getActivityAll,
  searchActivity,
  getClubActivityAll,
  getManageActivityAll,
  getUserActivityAll,
  activityIdInfo,
  getActivityStage,
  addActivityStage,
  getStageInfo,
  deleteActivityStage,
  memberActivityIdUserIdToBearName,
  teacherActivityIdUserIdToBearName,
  addactivityReport,
  alteractivityReport,
};
