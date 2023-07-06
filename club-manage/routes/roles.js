const express = require('express')
var router = express.Router()

// 导入路由处理函数
const roleHandler = require('../routes_handler/roles')
// 查询所有角色
router.post('/roleList', roleHandler.roleList)
// 角色列表,分页
router.post('/getListByPage', roleHandler.getListByPage)
// 对角色名，备注模糊查询
router.post('/search', roleHandler.search)
// 添加角色
router.post('/addRole', roleHandler.addRole)
// 修改角色信息
router.post('/updateRole', roleHandler.updateRole)
// 删除角色
router.post('/deleteRole', roleHandler.deleteRole)
// 分配角色权限
router.post('/shareRolePower', roleHandler.shareRolePower)

module.exports = router
