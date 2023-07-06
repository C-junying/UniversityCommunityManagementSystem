// promise错误可以让app.js接收
require('express-async-errors')

// 引入数据操作
const costDao = require('../dao/CostDao')
const clubDao = require('../dao/club/ClubDao')
// 生成16位UUID
const { uuid, getNowTime } = require('../utils/myStr')

// 查看所有申请
exports.getCostApplyAll = async (req, res) => {
  let ret = await costDao.getCostApplyAll()
  ret.sort((a, b) => b['apply_time'] - a['apply_time'])
  res.json({ code: 200, data: ret })
}
// 查看某个社团的资金申请记录
exports.getClubCostApply = async (req, res) => {
  let club = req.body || req.params
  let ret = await costDao.getClubCostApply(club.clubId)
  ret.sort((a, b) => b['apply_time'] - a['apply_time'])
  res.json({ code: 200, data: ret })
}
// 添加社团的资金申请
exports.addCostApply = async (req, res) => {
  let cost = req.body || req.params
  cost.applyId = uuid()
  cost.applyTime = getNowTime()
  cost.applyUser = req.auth.userId
  cost.applyState = 0
  let ret = await costDao.addCostApply(cost)
  res.json({ code: 200, data: ret, msg: '添加成功' })
}
// 审核资金申请
exports.auditCostApply = async (req, res) => {
  let cost = req.body || req.params
  cost.replyTime = getNowTime()
  let ret = await costDao.auditCostApply(cost)
  if (cost.applyState === 1) {
    let clubInfo = await clubDao.clubIdClub(cost.clubId)
    let club = {
      clubId: cost.clubId,
      money: clubInfo[0].money + cost.applyCost,
    }
    // 第一个是社团的收入
    // 第二个是管理员的支出
    let bill1 = [
      uuid(),
      cost.billName,
      cost.clubId,
      '000000',
      cost.applyUser,
      cost.clubId,
      cost.replyTime,
      '1',
      '收入',
      cost.reply,
    ]
    let bill2 = [
      uuid(),
      cost.billName,
      '000000',
      '000000',
      req.auth.userId,
      cost.clubId,
      cost.replyTime,
      '1',
      '支出',
      cost.reply,
    ]
    let billList = [bill1, bill2]
    let projectList = [
      [uuid(), bill1[0], bill1[1], 1, cost.applyCost],
      [uuid(), bill2[0], bill2[1], 1, cost.applyCost],
    ]
    let result = await costDao.auditCostApplyPass(club, billList, projectList)
    res.json({ code: 200, data: result, msg: '审核通过' })
  } else {
    res.json({ code: 200, data: ret, msg: '审核不通过' })
  }
}

// 撤销资金申请
exports.deleteCostApply = async (req, res) => {
  let cost = req.body || req.params
  let ret = await costDao.deleteCostApply(cost.applyId)
  res.json({ code: 200, data: ret, msg: '撤销成功' })
}
// 查管理员的资金
exports.getManageCost = async (req, res) => {
  let ret = await costDao.getManageCost('000000')
  ret = ret.map((item) => {
    if (item['source_id'] === '000000') {
      item['source_name'] = '管理员'
    }
    return item
  })
  res.json({ code: 200, data: ret })
}

// 查社团的资金
exports.getClubCost = async (req, res) => {
  let club = req.body || req.params
  let ret = await costDao.getClubCost(club.clubId)
  ret = ret.map((item) => {
    if (item['source_id'] === '000000') {
      item['source_name'] = '管理员'
    } else {
      item['source_name'] = item['club_name']
    }
    return item
  })
  res.json({ code: 200, data: ret })
}
// 查看账单的详细信息
exports.getCostToProject = async (req, res) => {
  let bill = req.body || req.params
  let ret = await costDao.getCostToProject(bill.billId)
  res.json({ code: 200, data: ret })
}
// 返回支付名称
exports.getPayName = async (req, res) => {
  let bill = req.body || req.params
  for (let i = 0; i < bill.length; i++) {
    let ret = await costDao.getPayName(bill[i]['pay_object'])
    if (ret[0]['club_id'] === bill[i]['pay_object']) bill[i]['pay_name'] = ret[0]['club_name']
    else if (ret[0]['activity_id'] === bill[i]['pay_object']) {
      bill[i]['pay_name'] = ret[0]['activity_title']
    }
  }
  res.json({ code: 200, data: bill })
}
// 测试
exports.insertCost = async (req, res) => {
  let ret = await costDao.insertCost([['498465'], ['12314845']])
  res.json({ code: 200, data: ret })
}
