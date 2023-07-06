var express = require('express')
var router = express.Router()

// 导入路由处理函数
const costHandle = require('../routes_handler/cost')

// 查看所有申请
router.post('/getCostApplyAll', costHandle.getCostApplyAll)

// 查看某个社团的资金申请记录
router.post('/getClubCostApply', costHandle.getClubCostApply)

// 添加社团的资金申请
router.post('/addCostApply', costHandle.addCostApply)

// 审核资金申请
router.post('/auditCostApply', costHandle.auditCostApply)

// 撤销资金申请
router.post('/deleteCostApply', costHandle.deleteCostApply)

// 查管理员的资金
router.post('/getManageCost', costHandle.getManageCost)

// 查社团的资金
router.post('/getClubCost', costHandle.getClubCost)

// 查看账单的详细信息
router.post('/getCostToProject', costHandle.getCostToProject)
// 返回支付名称
router.post('/getPayName', costHandle.getPayName)
// 测试
router.post('/insertCost', costHandle.insertCost)
module.exports = router
