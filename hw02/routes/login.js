var express = require('express');
var router = express.Router();
var path = require('path');

var md5 = require('blueimp-md5')
var User = require('../model/user')

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.resolve("../public/htmls/login.html"));
});

router.post('/', function (req, res, next) {
  // 1. 获取表单数据
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据
  var body = req.body

  User.findOne({
    username: body.username,
    password: md5(md5(body.password))
  }, function (err, user) {
    if (err) {
      // return res.status(500).json({
      //   err_code: 500,
      //   message: err.message
      // })
      return next(err)
    }

    // 如果邮箱和密码匹配，则 user 是查询到的用户对象，否则就是 null
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: '账号或密码错误，请重新输入.'
      })
    }

    res.status(200).json({
      err_code: 0,
      message: body.username
    })
  })
});


module.exports = router;