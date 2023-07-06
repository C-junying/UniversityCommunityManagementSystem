var express = require('express')
var router = express.Router()

// 导入路由处理函数
const clubTypeHandle = require('../../routes_handler/club/clubType')

// 查询所有社团类型
router.post('/clubTypeAll', clubTypeHandle.clubTypeAll)

// 社团类型 模糊查询
router.post('/clubTypeSearch', clubTypeHandle.clubTypeSearch)

// 添加社团类型
router.post('/addClubType', clubTypeHandle.addClubType)

// 编辑社团类型
router.post('/updateClubType', clubTypeHandle.updateClubType)

// 删除社团类型
router.post('/deleteClubType', clubTypeHandle.deleteClubType)
module.exports = router
