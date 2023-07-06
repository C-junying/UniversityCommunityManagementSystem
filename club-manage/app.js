var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const { expressjwt } = require('express-jwt');
const cors = require('cors');

// 导入路由
const indexRouter = require('./routes/index');
// 建立express
var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
//将静态资源托管，这样才能在浏览器上直接访问预览图片或则html页面
app.use(express.static(path.join(__dirname, './public')));
// 跨域
app.use(cors());

//token验证 - 需要在所有路由前添加，否则直接进路由不进验证
app.use(
  expressjwt({
    secret: 'junying', // 签名的密钥 或 PublicKey => req.auth
    algorithms: ['HS256'],
  }).unless({
    path: [
      '/users/login',
      '/users/resetPassword',
      '/users/register',
      '/activity/getManageActivityAll',
      '/club/getClubsAll',
      /^\/images\//,
    ], // 指定路径不经过 Token 解析
  })
);

// 使用路由
app.use(indexRouter);

//404 错误
// app.use(function (req, res, next) {
//   res.status(404).json({ code: 404, msg: '页面不存在！' })
// })
// 其他错误处理
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ code: 401, msg: err.message });
  } else {
    res.status(err.status || 500).json({ code: err.status || 500, msg: err.message });
  }
});

module.exports = app;
