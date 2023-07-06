var express = require('express')
var router = express.Router()

// 导入路由处理函数
const activityTypeHandle = require('../../routes_handler/activity/activityType')

// 查询所有活动类型
router.post('/activityTypeAll', activityTypeHandle.activityTypeAll)

// 活动类型 模糊查询
router.post('/activityTypeSearch', activityTypeHandle.activityTypeSearch)

// 添加活动类型
router.post('/addActivityType', activityTypeHandle.addActivityType)

// 编辑活动类型
router.post('/updateActivityType', activityTypeHandle.updateActivityType)

// 删除活动类型
router.post('/deleteActivityType', activityTypeHandle.deleteActivityType)
module.exports = router
