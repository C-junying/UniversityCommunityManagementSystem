const express = require('express');
var router = express.Router();

// 导入路由处理函数
const usersHandle = require('../routes_handler/users');

// 测试
router.get('/test', usersHandle.test);
// 查看所有用户
router.post('/queryAll', usersHandle.allUser);
// 查看某个用户的信息
router.post('/getUserId', usersHandle.getUserId);
// 查看当前用户的信息
router.post('/getUserInfo', usersHandle.getUserInfo);
// 模糊查询
router.post('/getSearch', usersHandle.getSearch);
// 分页
router.post('/userList', usersHandle.userList);
// 注册新用户
router.post('/register', usersHandle.regUser);
// 登录
router.post('/login', usersHandle.login);
// 删除用户
router.post('/delete', usersHandle.delete);
// 编辑用户
router.post('/update', usersHandle.update);
// 更新当前用户信息
router.post('/updateCurrentUser', usersHandle.updateCurrentUser);
// 忘记密码
router.post('/resetPassword', usersHandle.resetPassword);
// 修改密码
router.post('/updatePassword', usersHandle.updatePassword);
// 获取token中的信息
router.post('/getToken', usersHandle.getToken);
// 测试execAllTransection
router.post('/testExecAllTransection', usersHandle.testExecAllTransection);
module.exports = router;
