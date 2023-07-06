const BaseDao = require('../BaseDao');

// 查看当前社团有哪些学期报告
const clubIdReportAll = (clubId) => {
  const sql =
    'select club_report.*,user_name from club_report left join user on club_report.user_id=user.user_id where club_id=?';
  const params = [clubId];
  return BaseDao.execute(sql, params);
};
// 查看社团的某个报告
const lookClubIdReportId = (clubId, reportId) => {
  const sql =
    'select club_name,club_report.*,user_name from club left join club_report on club.club_id=club_report.club_id \
      left join user on club_report.user_id=user.user_id where club_report.club_id=? and club_report.report_id=?';
  const params = [clubId, reportId];
  return BaseDao.execute(sql, params);
};
// 添加学期报告
const addReport = (report) => {
  const arr = [
    {
      sql: 'insert into club_report(report_id,club_id,user_id,report_title,report_intro,report_content,picture,stage_name,create_time) \
            values(?,?,?,?,?,?,?,?,?)',
      params: [
        report.reportId,
        report.clubId,
        report.userId,
        report.reportTitle,
        report.reportIntro,
        report.reportContent,
        report.picture,
        report.stageName,
        report.createTime,
      ],
    },
  ];
  return BaseDao.execTransection(arr);
};
// 删除学期报告
const deleteReport = (reportId) => {
  const arr = [
    {
      sql: 'delete from club_report where report_id=?',
      params: [reportId],
    },
  ];
  return BaseDao.execTransection(arr);
};
module.exports = {
  clubIdReportAll,
  lookClubIdReportId,
  addReport,
  deleteReport,
};
