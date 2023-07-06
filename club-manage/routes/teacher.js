const express = require('express')
var router = express.Router()

// 导入路由处理函数
const teacherHandle = require('../routes_handler/teacher')

// 查询所有老师
router.post('/teacherAll', teacherHandle.teacherAll)

// 查询所有老师  模糊查询
router.post('/teacherSearch', teacherHandle.teacherSearch)
// 通过clubId查询
router.post('/clubIdTeacher', teacherHandle.clubIdTeacher)
// 添加老师
router.post('/addteacher', teacherHandle.addteacher)

// 删除用户
router.post('/deleteteacher', teacherHandle.deleteteacher)

// 编辑用户
router.post('/updateteacher', teacherHandle.updateteacher)

module.exports = router
