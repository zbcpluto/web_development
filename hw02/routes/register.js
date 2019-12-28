var express = require('express');
var router = express.Router();
var path = require('path');

var md5 = require('blueimp-md5');

var User = require('../model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve("../public/htmls/register.html"));
});

router.post('/', function (req, res, next) {
    var body = req.body
    User.findOne({
        $or: [{
            username: body.username
        }
        ]
    }, function (err, data) {
        if (err) {
            // return res.status(500).json({
            //   success: false,
            //   message: '服务端错误'
            // })
            return next(err)
        }
        if (data) {
            console.log("该用户名已被注册");
            // 邮箱或者昵称已存在
            return res.status(200).json({
                err_code: 1,
                message: 'Username already exists.'
            })
        }

        // 对密码进行 md5 重复加密
        body.password = md5(md5(body.password));

        new User(body).save(function (err, user) {
            if (err) {
                return next(err)
            }

            res.status(200).json({
                err_code: 0,
                message: body.username
            })

        })
    })
})


module.exports = router;