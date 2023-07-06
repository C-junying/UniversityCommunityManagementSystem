const BaseDao = require('../BaseDao');

// 查看所有申请社团记录
const applyClubAll = () => {
  const sql =
    'select apply.*,club_id,club.user_id,user_name,phone,state from club left join apply on club.apply_id=apply.apply_id \
    left join user on apply.apply_user = user.user_id';
  return BaseDao.execute(sql);
};
// 审核列表模糊查询
const searchApplyClub = (keywords) => {
  const sql =
    'select apply.*,club_id,club.user_id,user_name,phone,state from club left join apply on club.apply_id=apply.apply_id \
    left join user on apply.apply_user = user.user_id\
    where CONCAT_WS("",apply.name,user_name,phone) REGEXP ?';
  const params = [keywords];
  return BaseDao.execute(sql, params);
};
// 查看当前用户有哪些申请社团记录
const userApplyClubAll = (userId) => {
  const sql =
    'select apply.*,club_id,user_name,phone,state from club left join apply on club.apply_id=apply.apply_id left join user on apply.apply_user=user.user_id where club.user_id = ?';
  const params = [userId];
  return BaseDao.execute(sql, params);
};
// 查看apply_id的申请社团记录
const applyIdApplyClub = (applyId) => {
  const sql =
    'select apply.*,club.*,user_name,phone,area_name,type_name from club left join apply on club.apply_id=apply.apply_id \
    left join user on apply.apply_user=user.user_id left join area on apply.area_id=area.area_id \
    left join club_type on club.type_id=club_type.type_id where club.apply_id = ?';
  const params = [applyId];
  return BaseDao.execute(sql, params);
};

// 查看club_id的所有社团信息
const clubIdApplyClub = (clubId) => {
  const sql =
    'select apply.*,club.*,user_name,phone,area_name,type_name from club left join apply on club.apply_id=apply.apply_id \
    left join user on apply.apply_user=user.user_id left join area on apply.area_id=area.area_id \
    left join club_type on club.type_id=club_type.type_id where club.club_id = ?';
  const params = [clubId];
  return BaseDao.execute(sql, params);
};
// 提交申请社团
const addApplyClub = (applyInfo, clubInfor, user) => {
  const arr = [
    {
      sql: 'insert into apply(apply_id,area_id,apply_user,name,apply_content,apply_time,apply_state) values(?,?,?,?,?,?,?)',
      params: [
        applyInfo.applyId,
        applyInfo.areaId,
        user.userId,
        clubInfor.clubName,
        applyInfo.applyContent,
        applyInfo.applyTime,
        applyInfo.applyState,
      ],
    },
    {
      sql: 'insert into club(club_id,apply_id,type_id,user_id,club_name,picture,club_intro,club_content) values(?,?,?,?,?,?,?,?)',
      params: [
        clubInfor.clubId,
        applyInfo.applyId,
        clubInfor.typeId,
        user.userId,
        clubInfor.clubName,
        clubInfor.picture,
        clubInfor.clubIntro,
        clubInfor.clubContent,
      ],
    },
    {
      sql: 'insert into bear(bear_id,teacher_id,bear_name) values(?,?,?)',
      params: [clubInfor.clubId, clubInfor.teacherId, clubInfor.bearName],
    },
  ];
  return BaseDao.execTransection(arr);
};
// 审核申请社团
const auditApplyClub = (applyClub) => {
  const arr = [
    {
      sql: 'update apply set apply_state=?,reply=?,reply_time=? where apply_id=?',
      params: [applyClub.applyState, applyClub.reply, applyClub.replyTime, applyClub.applyId],
    },
  ];
  return BaseDao.execTransection(arr);
};
// 发布社团
const releaseClub = (applyId, state) => {
  const arr = [
    {
      sql: 'update club set state=? where apply_id=?',
      params: [state, applyId],
    },
  ];
  return BaseDao.execTransection(arr);
};
// 删除申请社团记录
const deleteApplyClub = (applyId, clubId) => {
  const arr = [
    {
      sql: 'delete from bear where bear_id=?',
      params: [clubId],
    },
    {
      sql: 'delete from club where club_id=?',
      params: [clubId],
    },
    {
      sql: 'delete from apply where apply_id=?',
      params: [applyId],
    },
  ];
  return BaseDao.execTransection(arr);
};
// 查询所有社团
const getClubsAll = () => {
  const sql =
    'select area_name,reply_time,club.*,type_name,club_type.picture as type_picture,user_name from \
    club left join club_type on club.type_id=club_type.type_id \
     left join apply on club.apply_id=apply.apply_id left join area on apply.area_id=area.area_id left join user on club.user_id=user.user_id';
  return BaseDao.execute(sql);
};
// 查询所有社团 模糊查询
const searchClubsAll = (keywords) => {
  const sql =
    'select area_name,reply_time,club.*,type_name,user_name from club left join club_type on club.type_id=club_type.type_id\
     left join apply on club.apply_id=apply.apply_id left join area on apply.area_id=area.area_id \
     left join user on club.user_id=user.user_id where CONCAT_WS("",club_name,user_name,type_name) REGEXP ?';
  const params = [keywords];
  return BaseDao.execute(sql, params);
};
// 查询用户的社团
const getUserClubs = (userId) => {
  const sql =
    'select DISTINCT club.*,type_name,club_type.picture as type_picture from \
     club left join club_member on club.club_id=club_member.club_id \
     LEFT JOIN bear on club.club_id=bear.bear_id \
    LEFT JOIN teacher on bear.teacher_id=teacher.teacher_id \
     left join club_type on club.type_id=club_type.type_id where club_member.user_id=?|| teacher.user_id=?';
  const params = [userId, userId];
  return BaseDao.execute(sql, params);
};
// 查看club_id的社团信息
const clubIdClub = (clubId) => {
  const sql = 'select * from club where club.club_id = ?';
  const params = [clubId];
  return BaseDao.execute(sql, params);
};
// 更新社团
const updateClubInfo = (club) => {
  const arr = [
    {
      sql: 'update club set type_id=?,picture=?,club_intro=?,club_content=? where club_id=?',
      params: [club.typeId, club.picture, club.clubIntro, club.clubContent, club.clubId],
    },
  ];
  return BaseDao.execTransection(arr);
};
// 查看社团有哪些社团成员
const getClubMember = (clubId) => {
  const sql = 'select * from club_member left join user on club_member.user_id=user.user_id where club_id=?';
  const params = [clubId];
  return BaseDao.execute(sql, params);
};
// 查看社团有哪些社团成员 模糊查询
const searchClubMember = (clubId, keywords) => {
  const sql =
    'select * from club_member left join user on club_member.user_id=user.user_id \
  where club_id=? and CONCAT_WS("",user_name,phone) REGEXP ?';
  const params = [clubId, keywords];
  return BaseDao.execute(sql, params);
};
// 根据clubId和userId查看当前用户在社团担任什么职位 成员
const memberClubIdUserIdToBearName = (clubId, userId) => {
  const sql = 'select * from club_member where club_id=? and user_id=?';
  const params = [clubId, userId];
  return BaseDao.execute(sql, params);
};
// 根据clubId和userId查看当前用户在社团担任什么职位 老师
const teacherClubIdUserIdToBearName = (clubId, userId) => {
  const sql =
    'select * from bear left join teacher on bear.teacher_id=teacher.teacher_id where bear_id=? and user_id=?';
  const params = [clubId, userId];
  return BaseDao.execute(sql, params);
};

// 解散社团
const clubDisband = (clubId) => {
  const arr = [
    {
      sql: 'update club set state=? where club_id=?',
      params: [2, clubId],
    },
    {
      sql: 'update area set status=1 where area_id in (select apply.area_id from club \
        left join apply on club.apply_id=apply.apply_id where club_id=?)',
      params: [clubId],
    },
  ];
  return BaseDao.execTransection(arr);
};
// 撤回解散
const alterclubDisband = (clubId) => {
  const arr = [
    {
      sql: 'update club set state=? where club_id=?',
      params: [1, clubId],
    },
    {
      sql: 'update area set status=2 where area_id in (select apply.area_id from club \
        left join apply on club.apply_id=apply.apply_id where club_id=?)',
      params: [clubId],
    },
  ];
  return BaseDao.execTransection(arr);
};
module.exports = {
  applyClubAll,
  searchApplyClub,
  userApplyClubAll,
  applyIdApplyClub,
  clubIdClub,
  clubIdApplyClub,
  addApplyClub,
  auditApplyClub,
  releaseClub,
  deleteApplyClub,
  getClubsAll,
  searchClubsAll,
  updateClubInfo,
  getUserClubs,
  searchClubMember,
  getClubMember,
  memberClubIdUserIdToBearName,
  teacherClubIdUserIdToBearName,
  clubDisband,
  alterclubDisband,
};
