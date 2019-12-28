var express = require('express');
var router = express.Router();

var indexRouter = require('./index');
var loginRouter = require('./login');
var registerRouter = require('./register');

router.use('/', indexRouter);
router.use('/login', loginRouter);
router.use('/register', registerRouter);

module.exports = router;