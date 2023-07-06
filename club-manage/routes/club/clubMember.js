var express = require('express')
var router = express.Router()

// 导入路由处理函数
const memberHandle = require('../../routes_handler/club/clubMember')
// 查询某个社团的所有成员
router.post('/clubIdAllMember', memberHandle.clubIdAllMember)
// 添加社团成员
router.post('/addMember', memberHandle.addMember)
// 加入社团
router.post('/userJoinMember', memberHandle.userJoinMember)
// 更新成员职位
router.post('/updateMemberBear', memberHandle.updateMemberBear)
// 删除社团成员
router.post('/deleteMember', memberHandle.deleteMember)

module.exports = router
