// 引入数据
const teacherDao = require('../dao/TeacherDao');
const userDao = require('../dao/UserDao');
// 加密
var bcryptc = require('bcryptjs');
// 生成16位UUID
const { uuid, getNowTime } = require('../utils/myStr');

// 查询所有老师
exports.teacherAll = async (req, res) => {
  let ret = await teacherDao.teacherAll();
  res.json({ code: 200, data: ret });
};
// 查询所有老师  模糊查询
exports.teacherSearch = async (req, res) => {
  let { keywords } = req.body || req.params;
  let ret = await teacherDao.teacherSearch(keywords);
  res.json({ code: 200, data: ret });
};
// 通过clubId查询
exports.clubIdTeacher = async (req, res) => {
  let { clubId } = req.body || req.params;
  let ret = await teacherDao.clubIdTeacher(clubId);
  res.json({ code: 200, data: ret });
};
// 添加老师
exports.addteacher = async (req, res) => {
  let teacher = req.body || req.params;
  teacher.userId = uuid();
  teacher.roleId = '202304191413520003';
  teacher.teacherId = uuid();
  teacher.picture = 'http://localhost:8080/images/head/1.jpg';
  teacher.createTime = getNowTime();
  // 设置加密强度
  let salt = bcryptc.genSaltSync(10);
  // 用bcrypt加密
  teacher.password = bcryptc.hashSync(teacher.password, salt);
  let check = await userDao.login(teacher);
  if (check.length > 0) {
    res.json({ code: 3007, msg: '该用户手机已注册' });
  } else {
    let ret = await teacherDao.addteacher(teacher);
    res.json({ code: 200, data: ret, msg: '添加老师成功' });
  }
};
// 删除用户
exports.deleteteacher = async (req, res) => {
  let teacher = req.body || req.params;
  let ret = await teacherDao.deleteteacher(teacher.teacherId, teacher.userId);
  res.json({ code: 200, data: ret, msg: '删除成功' });
};
// 编辑用户
exports.updateteacher = async (req, res) => {
  let teacher = req.body || req.params;
  let ret = await teacherDao.updateteacher(teacher);
  res.json({ code: 200, data: ret, msg: '更新成功' });
};
