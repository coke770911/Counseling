const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const db = require('../models')
const md5 = require('md5')

router.use((req, res, next) => {
  res.locals.user = req.session  
  if(!(req.session.login === true)) {
    res.render('login', { title: '諮商系統登入', Message: '尚未登入。'})
    return;
  }
  next()
})

//修改密碼介面
router.get('/style', async (req, res, next) => {
  const UserData = await db.UserData.findOne({
    attributes: ['color','textColor'],
    where: {
      account: req.session.account
    }
  })
  res.render('users/style', { title: '諮商系統 密碼修改',UserData: UserData})
})

router.put('/style', upload.none(), async (req, res, next) => {
  const updated = await db.UserData.update({ 
    color: req.body.color , 
    textColor: req.body.textColor
  }, { 
    where: { account:req.session.account 
  } 
})
  res.status(200).send(JSON.stringify({ msg: updated ? '修改成功' : '修改成功' }))
})


//修改密碼介面
router.get('/pwd', (req, res, next) => {
  res.render('users/pwd', { title: '諮商系統 密碼修改'})
})

//修改密碼
router.put('/pwd', upload.none(), async (req, res, next) => {
  if(req.body.repassword !== req.body.password) {
    res.status(400).send(JSON.stringify({ msg: '新密碼驗證失敗，請確認密碼輸入正確。' }))
    return 
  }
  const updated = await db.UserData.update({ password: md5(req.body.repassword) }, { where: { account:req.session.account } })
  res.status(200).send(JSON.stringify({ msg: updated ? '修改成功' : '修改成功' }))
})

router.get('/view', async (req, res, next) => {
  res.render('users/view', { title: '諮商系統 權限設定'})
})

router.get('/detailed/:id', async (req, res, next) => {
  const UserAuthList = await db.UserAuth.findAll({
    attributes: ['id', 'titleName'],
    order: [['id', 'DESC']]
  })

  const UserDataAuth = await db.UserData.findOne({
    attributes: ['id', 'account', 'username', 'isDisabled', 'updatedAt','color','textColor'],
    include: db.UserAuth,
    where: {
      [db.Sequelize.Op.and]: [{ id: req.params.id }, { id: { [db.Sequelize.Op.notIn]: [1] } }]
    }
  })
  //初始化樣板顯示欄位
  let UserData = {
    "isDisabled": '',
    "updatedAt": '',
    "id": 0,
    "account": '',
    "username": '',
    "color": '#0d6efd',
    "textColor": '#000000',
    "UserAuth": {
      "id": '',
      "titleName": '',
    }
  }
  if(UserDataAuth) {
    UserData = UserDataAuth
  }
  //console.dir(UserData)
  res.render('users/detailed', { title: '諮商系統 權限設定', UserAuthList, UserData: UserData})
})

//新增使用者
router.post('/', upload.none(), async (req, res, next) => {
  const [createdata, created] = await db.UserData.findOrCreate({
    where: { account: req.body.account },
    defaults: {
      color: req.body.color,
      textColor: req.body.textColor,
      password: md5(req.body.password),
      username: req.body.username,
      userauthId: req.body.userauthId,
      isDisabled: req.body.isDisabled || 0
    }
  })
  res.status(200).send(JSON.stringify({ msg: created ? '新增成功' : '新增失敗' }))
})

//修改使用者
router.put('/', upload.none(), async (req, res, next) => {
  let Datafield = {}
  if (req.body.password !== '') {
    Datafield.password = md5(req.body.password)
  }
  Datafield.username = req.body.username
  Datafield.color = req.body.color
  Datafield.textColor = req.body.textColor
  Datafield.userauthId = req.body.userauthId
  Datafield.isDisabled = req.body.isDisabled || 0

  const updated = await db.UserData.update(Datafield, {
    where: {
      id: req.body.uid
    }
  })
  res.status(200).send(JSON.stringify({ msg: updated ? '修改成功' : '修改成功' }))
})

//取得全部 id:1為系統帳號不允許編輯
router.get('/', async (req, res, next) => {
  const UserAuthData = await db.UserData.findAll({
    attributes: ['id', 'account', 'username', 'isDisabled', 'updatedAt','isDisabledName','updatedLocal','color','textColor'],
    include: [{
      model: db.UserAuth,
      attributes: ['id', 'titleName']
    }],
    where: {
      id: {
        [db.Sequelize.Op.notIn]: [1]
      }
    }
  })
  res.send(JSON.stringify(UserAuthData, null, 4))
})

module.exports = router