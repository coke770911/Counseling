const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const db = require('../models')

router.use((req, res, next) => {
  res.locals.user = req.session  
  if(!(req.session.login === true)) {
    res.render('login', { title: '諮商系統登入', Message: '尚未登入。'})
    return;
  }
  //res.status(400).send(JSON.stringify({ msg: '尚未登入' }))
  next()
})

router.get('/view/:uid', async (req, res, next) => {
  //心理師
  let talkMajor = await db.UserData.findAll({
    raw: true,
    attributes: [['account','val'], ['username','content']],
    include: [{
      model: db.UserAuth,
      attributes: ['id', 'titleName']
    }],
    where: {
      userauthId: {
        [db.Sequelize.Op.in]: [3,4]
      }
    }
  })

  //個管員
  let talkManage = await db.UserData.findAll({
    raw: true,
    attributes: [['account','val'], ['username','content']],
    include: [{
      model: db.UserAuth,
      attributes: ['id', 'titleName']
    }],
    where: {userauthId: 2 }
  })
  //個案來源
  let ReasonList = await db.RefReason.findAll()
  //個案身份
  let RefIdentity = await db.RefIdentity.findAll()
  //危機評估
  let RefLevel = await db.RefLevel.findAll()
  //處理方式
  let RefProcess = await db.RefProcess.findAll()

  //主題來源
  let ThemeGroup1 = await db.RefTheme.findAll({where:{parentId:1}})
  let ThemeGroup2 = await db.RefTheme.findAll({where:{parentId:2}})
  let ThemeGroup3 = await db.RefTheme.findAll({where:{parentId:3}})
  let ThemeGroup4 = await db.RefTheme.findAll({where:{parentId:4}})

  res.render('record/view', { 
    title: '基本資料建檔',
    talkMajor: talkMajor,
    talkManage: talkManage,
    caseType: RefIdentity,
    caseLevel: RefLevel,
    caseProcess: RefProcess,
    caseSource: ReasonList,
    ThemeGroup1: ThemeGroup1,
    ThemeGroup2: ThemeGroup2,
    ThemeGroup3: ThemeGroup3,
    ThemeGroup4: ThemeGroup4 
  })
})

router.get('/', async (req, res, next) => {})
router.post('/', upload.none(), async (req, res, next) => {})
router.put('/', upload.none(), async (req, res, next) => {})
router.delete('/', async (req, res, next) => {})

module.exports = router