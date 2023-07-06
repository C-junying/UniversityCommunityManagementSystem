var express = require('express')
var router = express.Router()

// 导入路由处理函数
const areaHandle = require('../routes_handler/area')

// 查询所有场地
router.post('/areaAll', areaHandle.areaAll)

// 查询所有场地
router.post('/areaStatusAll', areaHandle.areaStatusAll)

// 场地 模糊查询
router.post('/areaSearch', areaHandle.areaSearch)

// 添加场地
router.post('/addArea', areaHandle.addArea)

// 编辑场地
router.post('/updateArea', areaHandle.updateArea)

// 删除场地
router.post('/deleteArea', areaHandle.deleteArea)
module.exports = router
