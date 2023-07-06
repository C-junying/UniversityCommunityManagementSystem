const express = require('express')
const router = express.Router()
// 管理路由,导入所有的路由
// 自定义模块
const homeRouter = require('./home')
// 用户模块
const usersRouter = require('./users')
// 菜单模块
const menuRouter = require('./menu')
// 角色模块
const roleRouter = require('./roles')
// 文件模块
const fileRouter = require('./file')
// 活动模块
const activityRouter = require('./activity/activity')
// 活动类型模块
const activityTypeRouter = require('./activity/activityType')
// 活动成员
const activityMemberRouter = require('./activity/activityMember')
// 社团模块
const clubRouter = require('./club/club')
// 社团类型模块
const clubTypeRouter = require('./club/clubType')
// 社团成员
const clubMemberRouter = require('./club/clubMember')
// 社团学期报告
const clubReportRouter = require('./club/clubReport')
// 场地模块
const areaRouter = require('./area')
// 老师模块
const teacherRouter = require('./teacher')
// 费用模块
const costRouter = require('./cost')

// 使用路由前缀地址
router.use('/', homeRouter)
router.use('/users', usersRouter)
router.use('/menu', menuRouter)
router.use('/role', roleRouter)
router.use('/images', fileRouter)
router.use('/club', clubRouter)
router.use('/club', clubTypeRouter)
router.use('/club', clubMemberRouter)
router.use('/club', clubReportRouter)
router.use('/activity', activityRouter)
router.use('/activity', activityTypeRouter)
router.use('/activity', activityMemberRouter)
router.use('/area', areaRouter)
router.use('/teacher', teacherRouter)
router.use('/cost', costRouter)

module.exports = router
