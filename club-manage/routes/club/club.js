var express = require('express')
var router = express.Router()

// 导入路由处理函数
const clubHandle = require('../../routes_handler/club/club')

// 查看所有申请社团记录
router.post('/applyClubAll', clubHandle.applyClubAll)
// 审核列表模糊查询
router.post('/searchApplyClub', clubHandle.searchApplyClub)
// 查看当前用户有哪些申请社团记录
router.post('/userApplyClubAll', clubHandle.userApplyClubAll)
// 查看apply_id的申请社团记录
router.post('/applyIdApplyClub', clubHandle.applyIdApplyClub)
// 查看club_id的社团所有信息
router.post('/clubIdApplyClub', clubHandle.clubIdApplyClub)
// 提交申请社团记录
router.post('/addApplyClub', clubHandle.addApplyClub)
// 审核申请社团
router.post('/auditApplyClub', clubHandle.auditApplyClub)
// 发布社团
router.post('/releaseClub', clubHandle.releaseClub)
// 删除申请社团记录
router.post('/deleteApplyClub', clubHandle.deleteApplyClub)
// 查询所有社团
router.post('/getClubsAll', clubHandle.getClubsAll)
// 查询所有社团 模糊查询
router.post('/searchClubsAll', clubHandle.searchClubsAll)
// 查询用户的社团
router.post('/getUserClubs', clubHandle.getUserClubs)
// 查看club_id的社团信息
router.post('/clubIdClub', clubHandle.clubIdClub)
// 更新社团
router.post('/updateClubInfo', clubHandle.updateClubInfo)
// 查看社团有哪些社团成员
router.post('/getClubMember', clubHandle.getClubMember)
// 查看社团有哪些社团成员 模糊
router.post('/searchClubMember', clubHandle.searchClubMember)
// 根据clubId和userId查看当前用户在社团担任什么职位
router.post('/clubIdUserIdToBearName', clubHandle.clubIdUserIdToBearName)
// 解散社团
router.post('/clubDisband', clubHandle.clubDisband)
// 撤回解散
router.post('/alterclubDisband', clubHandle.alterclubDisband)

module.exports = router
