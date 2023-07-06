const BaseDao = require('./BaseDao')

// 查询所有老师
const teacherAll = () => {
  const sql =
    'SELECT teacher.*,password,user_name,sex,phone FROM teacher left join user on teacher.user_id=user.user_id'
  return BaseDao.execute(sql)
}
// 查询所有老师  模糊查询
const teacherSearch = (search) => {
  const sql =
    'SELECT teacher.*,password,user_name,sex,phone FROM teacher left join user on teacher.user_id=user.user_id where CONCAT_WS("",user_name,college,phone,position) REGEXP ?'
  const params = [search]
  return BaseDao.execute(sql, params)
}
// 通过clubId查询
const clubIdTeacher = (clubId) => {
  const sql =
    'SELECT bear.*,teacher.*,user.* FROM bear left join teacher on bear.teacher_id=teacher.teacher_id \
    left join user on teacher.user_id=user.user_id where bear_id=?'
  const params = [clubId]
  return BaseDao.execute(sql, params)
}
// 通过clubId查询 模糊
const searchClubIdTeacher = (clubId, keywords) => {
  const sql =
    'SELECT bear.*,teacher.*,user.* FROM bear left join teacher on bear.teacher_id=teacher.teacher_id \
    left join user on teacher.user_id=user.user_id where bear_id=? and CONCAT_WS("",user_name,phone) REGEXP ?'
  const params = [clubId, keywords]
  return BaseDao.execute(sql, params)
}
// 查社团是否有某个老师
const clubIdTeacherPhone = (clubId, phone) => {
  const sql =
    'SELECT bear.*,teacher.*,user.* FROM bear left join teacher on bear.teacher_id=teacher.teacher_id \
    left join user on teacher.user_id=user.user_id where bear_id=? and phone=?'
  const params = [clubId, phone]
  return BaseDao.execute(sql, params)
}

// 添加老师
const addteacher = (teacher) => {
  const arr = [
    {
      sql: 'insert into user(user_id,password,nickname,user_name,sex,phone,picture, regist_time) values(?,?,?,?,?,?,?,?)',
      params: [
        teacher.userId,
        teacher.password,
        teacher.userName,
        teacher.userName,
        teacher.sex,
        teacher.phone,
        teacher.picture,
        teacher.createTime,
      ],
    },
    {
      sql: 'insert into play_role(user_id,role_id) values(?,?)',
      params: [teacher.userId, teacher.roleId],
    },
    {
      sql: 'insert into teacher(teacher_id,user_id,college,position) values(?,?,?,?)',
      params: [teacher.teacherId, teacher.userId, teacher.college, teacher.position],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 编辑老师
const updateteacher = (teacher) => {
  const arr = [
    {
      sql: 'update user set user_name=?,sex=?,phone=? where user_id=?',
      params: [teacher.userName, teacher.sex, teacher.phone, teacher.userId],
    },
    {
      sql: 'update teacher set college=?,position=? where teacher_id=?',
      params: [teacher.college, teacher.position, teacher.teacherId],
    },
  ]
  return BaseDao.execTransection(arr)
}

// 删除老师
const deleteteacher = (teacherId, userId) => {
  const arr = [
    {
      sql: 'delete from teacher where teacher_id=?',
      params: [teacherId],
    },
    {
      sql: 'delete from play_role where user_id = ?',
      params: [userId],
    },
    {
      sql: 'delete from user where user_id=?',
      params: [userId],
    },
  ]
  return BaseDao.execTransection(arr)
}

module.exports = {
  teacherAll,
  teacherSearch,
  clubIdTeacher,
  searchClubIdTeacher,
  clubIdTeacherPhone,
  addteacher,
  updateteacher,
  deleteteacher,
}
