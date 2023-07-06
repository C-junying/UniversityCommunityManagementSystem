// 加密
var bcryptc = require('bcryptjs');
// token令牌
const jwt = require('jsonwebtoken');
// promise错误可以让app.js接收
require('express-async-errors');

// 引入数据
const userDao = require('../dao/UserDao');
// 生成16位UUID
const { uuid, getNowTime } = require('../utils/myStr');
// 把数据库格式转为驼峰
const { toHump } = require('../utils/toHump');
const { execAllTransection } = require('../dao/BaseDao');

// 路由处理函数
// 测试
exports.test = (req, res) => {
  // res.json({ code: 200, data: myUUid.moreUUID(1000) })
  res.json({ code: 200, data: { a: __dirname, b: __filename } });
};
// 查看所有用户
exports.allUser = async (req, res) => {
  let ret = await userDao.queryAll();
  res.json({ code: 200, data: ret });
};
// 查看某个用户的信息
exports.getUserId = async (req, res) => {
  const user = req.body;
  let ret = await userDao.getUserId(user.userId);
  console.log(ret);
  res.json({ code: 200, data: ret[0] });
};
// 查看当前用户的信息
exports.getUserInfo = async (req, res) => {
  let ret = await userDao.getUserId(req.auth.userId);
  res.json({ code: 200, data: ret[0] });
};

// 模糊查询
exports.getSearch = async (req, res) => {
  let { keywords } = req.body || req.params;
  let ret = await userDao.getSearch(keywords);
  res.json({ code: 200, data: ret });
};
// pageSize:页大小
// pageNum:那一页
// count:总数
exports.userList = async (req, res) => {
  let page = req.body || req.params;
  // 调用DAO获取数据
  let count = await userDao.getCount();
  let ret = await userDao.getListByPage(page.pageNum, page.pageSize);
  // 封装返回数据
  res.json({ code: 200, data: { count: count[0].count, list: ret } });
};
// 注册
exports.regUser = async (req, res) => {
  let user = req.body || req.params;
  user.userId = uuid();
  user.createTime = getNowTime();
  // 设置加密强度
  let salt = bcryptc.genSaltSync(10);
  // 用bcrypt加密
  user.password = bcryptc.hashSync(user.password, salt);
  let check = await userDao.login(user);
  if (check.length > 0) {
    res.json({ code: 3007, msg: '该用户手机或邮箱已注册' });
  } else {
    let ret = await userDao.register(user);
    res.json({ code: 200, data: ret, msg: '注册成功' });
  }
};
// 登录
exports.login = async (req, res) => {
  const userinfo = req.body;
  // 调用dao获取数据
  let ret = await userDao.login(userinfo);
  if (ret.length === 0) {
    res.json({ code: 3002, msg: '该用户不存在' });
  } else {
    const obj = toHump(ret[0]);
    // bcrypt验证
    if (bcryptc.compareSync(userinfo.password, obj.password)) {
      // 用户登录成功
      let token = jwt.sign(
        {
          userId: obj.userId,
          userName: obj.userName,
          roleId: obj.roleId,
          roleName: obj.roleName,
        },
        'junying', //秘钥
        { expiresIn: 3600 * 24 } //有效期
      );
      res.json({ code: 200, data: token, userInfo: obj, msg: '登录成功' });
    } else {
      res.json({ code: 3003, msg: '密码输入错误' });
    }
  }
};
// 删除用户
exports.delete = async (req, res) => {
  let user = req.body || req.params;
  let ret = await userDao.deleteUser(user);
  res.json({ code: 200, data: ret, msg: '删除成功' });
};
// 编辑用户
exports.update = async (req, res) => {
  let user = req.body || req.params;
  let check = await userDao.login(user);
  if (check.length > 0 && check[0]['user_id'] !== user.userId) {
    res.json({ code: 3007, msg: '该手机或邮箱已注册' });
  } else {
    let ret = await userDao.updateUser(user);
    res.json({ code: 200, data: ret, msg: '用户编辑成功' });
  }
};
// 更新当前用户信息
exports.updateCurrentUser = async (req, res) => {
  let user = req.body || req.params;
  let check = await userDao.login(user);
  if (check.find((val) => val['user_id'] !== user.userId)) {
    res.json({ code: 3007, msg: '该手机或邮箱已注册' });
  } else {
    let ret = await userDao.updateCurrentUser(user);
    res.json({ code: 200, data: ret, msg: '用户更新成功' });
  }
};
// 修改密码
exports.updatePassword = async (req, res) => {
  let user = req.body || req.params;
  // 设置加密强度
  let salt = bcryptc.genSaltSync(10);
  // 用bcrypt加密
  user.password = bcryptc.hashSync(user.password, salt);
  let ret = await userDao.updatePassword(user);
  res.json({ code: 200, data: ret, msg: '修改成功' });
};
// 忘记密码
exports.resetPassword = async (req, res) => {
  let user = req.body || req.params;
  let check = await userDao.resetPassword(user);
  if (check.length === 0) {
    res.json({ code: 3100, msg: '没有该用户' });
  } else {
    // 设置加密强度
    let salt = bcryptc.genSaltSync(10);
    // 用bcrypt加密
    user.password = bcryptc.hashSync(user.password, salt);
    user.userId = check[0]['user_id'];
    let ret = await userDao.updatePassword(user);
    res.json({ code: 200, data: ret, msg: '更新成功' });
  }
};
// 获取token中的信息
exports.getToken = async (req, res) => {
  console.log(req.auth);
  res.json({ code: 200, data: req.auth });
};
// 测试execAllTransection
exports.testExecAllTransection = async (req, res) => {
  let user1 = { userName: 'as', createTime: getNowTime(), userId: 'as' };
  let user2 = { userName: 'as', createTime: getNowTime(), userId: 'qw' };
  let ret = await execAllTransection([
    { func: userDao.testExecAllTransection, params: [user1] },
    { func: userDao.testExecAllTransection, params: [user2] },
  ]);
  res.json({ code: 200, data: ret, msg: '修改成功' });
};
