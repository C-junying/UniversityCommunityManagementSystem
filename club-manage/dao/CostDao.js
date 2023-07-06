const BaseDao = require('./BaseDao')

// 查看所有申请
const getCostApplyAll = () => {
  const sql =
    'select cost_apply.*,club_name,user_name from cost_apply left join club on cost_apply.club_id=club.club_id \
    left join user on cost_apply.apply_user=user.user_id'
  return BaseDao.execute(sql)
}
// 查看某个社团的资金申请记录
const getClubCostApply = (clubId) => {
  const sql =
    'select cost_apply.*,club_name,user_name from cost_apply left join club on cost_apply.club_id=club.club_id \
    left join user on cost_apply.apply_user=user.user_id where cost_apply.club_id = ?'
  const params = [clubId]
  return BaseDao.execute(sql, params)
}
// 添加社团的资金申请
const addCostApply = (cost) => {
  const arr = [
    {
      sql: 'insert into cost_apply(apply_id,club_id,apply_user,apply_content,apply_time,apply_state,apply_cost) values(?,?,?,?,?,?,?)',
      params: [
        cost.applyId,
        cost.clubId,
        cost.applyUser,
        cost.applyContent,
        cost.applyTime,
        cost.applyState,
        cost.applyCost,
      ],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 审核资金申请
const auditCostApply = (cost) => {
  const arr = [
    {
      sql: 'update cost_apply set apply_state=?,reply=?,reply_time=? where apply_id=?',
      params: [cost.applyState, cost.reply, cost.replyTime, cost.applyId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 资金申请 通过
// billList:[[],[]]
// projectList:[[],[]]
const auditCostApplyPass = (club, billList, projectList) => {
  const arr = [
    {
      sql: 'insert into bill(bill_id,bill_name,bill_belong,source_id,user_id,pay_object,date,pay_state,bill_type,remark) values ?',
      params: [billList],
    },
    {
      sql: 'insert into project(project_id,bill_id,project_name,project_num,price) values ?',
      params: [projectList],
    },
    {
      sql: 'update club set money=? where club_id = ?',
      params: [club.money, club.clubId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 撤销资金申请
const deleteCostApply = (applyId) => {
  const arr = [
    {
      sql: 'delete from cost_apply where apply_id = ?',
      params: [applyId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 查管理员的资金
const getManageCost = (userId) => {
  const sql =
    'select DISTINCT bill.*,c.club_name as pay_name,club.club_name,user_name,SUM(price) as total from bill left join user on bill.user_id=user.user_id\
  left join club on bill.source_id=club.club_id left join club  c on bill.pay_object=c.club_id left join project on bill.bill_id=project.bill_id \
  where  bill_belong = ? GROUP BY bill_id'
  const params = [userId]
  return BaseDao.execute(sql, params)
}
// 查社团的资金
const getClubCost = (clubId) => {
  const sql =
    'select DISTINCT bill.*,club.club_name,user_name,SUM(price) as total from bill left join user on bill.user_id=user.user_id\
     left join club on bill.source_id=club.club_id  left join project on bill.bill_id=project.bill_id \
     where  bill_belong = ? GROUP BY bill_id'
  const params = [clubId]
  return BaseDao.execute(sql, params)
}
// 查看账单的详细信息
const getCostToProject = (billId) => {
  const sql =
    'select bill_name,project.* from bill left join project on bill.bill_id=project.bill_id\
     where bill.bill_id = ?'
  const params = [billId]
  return BaseDao.execute(sql, params)
}
// 返回支付名称
const getPayName = (clubId) => {
  const sql =
    'select club.club_id,club_name,activity_id,activity_title from activity left join club on activity.club_id=club.club_id\
    left join apply on activity.apply_id=apply.apply_id where (activity.club_id = ? or activity_id = ?) and apply_state=1 '
  const params = [clubId, clubId]
  return BaseDao.execute(sql, params)
}
// 测试
const insertCost = (billList) => {
  const arr = [
    {
      sql: 'insert into bill(bill_id) values ?',
      params: [billList],
    },
  ]
  return BaseDao.execTransection(arr)
}
module.exports = {
  getCostApplyAll,
  getClubCostApply,
  addCostApply,
  auditCostApply,
  auditCostApplyPass,
  deleteCostApply,
  getManageCost,
  getClubCost,
  getCostToProject,
  getPayName,
  insertCost,
}
