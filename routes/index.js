const express = require('express')
const router = express.Router()
const soap = require('soap');
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
  let account = req.body.account.split('/')
  let args = {
    Account: account.length >= 2 ? account[1] : account[0] ,
    Password: req.body.password
  }
  
  let client = await soap.createClientAsync(process.env.SOAP_ADURL)
  let result = await client.GetAeustAuthenticationConnectAsync(args);
  let whereObj = result[0].GetAeustAuthenticationConnectResult === 'True 登入成功' ? { isDisabled: false, account: account[0] } : {isDisabled: false, account: account[0], password: md5(req.body.password)}
  
  const logData = await db.UserData.findOne({
    include: db.UserAuth,
    where:  whereObj
  })

  if (logData) {
    req.session.login = 1
    req.session.account = logData.dataValues.account
    req.session.username = logData.dataValues.username
    req.session.titlename = logData.dataValues.UserAuth.dataValues.titleName
    console.dir(req.session)
    res.redirect('/calendar/view')
  } else {
    MessageTxt = '帳號密碼錯誤或者尚未開通帳號。'
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
