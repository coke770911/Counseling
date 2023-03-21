const express = require('express')
const router = express.Router()
const db = require('../models')
const md5 = require('md5')

let MessageTxt = ''
/* GET home page. */

router.use((req, res, next) => {
  res.locals.user = req.session
  next()
})

router.get('/', function (req, res, next) {
  res.render('login', { title: '諮商系統' })
})

// 登入控制
router.post('/login', async function (req, res, next) {
  const logData = await db.UserData.findOne({
    include: db.UserAuth,
    where: {
      account: req.body.account,
      password: md5(req.body.password)
    }
  })

  if (logData) {
    req.session.login = 1
    req.session.account = logData.dataValues.account
    req.session.username = logData.dataValues.username
    req.session.titlename = logData.dataValues.UserAuth.dataValues.titleName
    req.session.authUrl = { a: 0, b: 1 }

    console.dir(req.session)
    res.redirect('/calendar/view')
  } else {
    MessageTxt = '帳號密碼有錯誤！'
    res.render('login', { title: '諮商系統登入', Message: MessageTxt, account: req.body.account })
  }
})

// 登出控制
router.get('/logout', function (req, res, next) {
  MessageTxt = '已登出！'
  req.session.destroy()
  res.render('login', { title: '登入畫面', Message: MessageTxt })
})

module.exports = router
