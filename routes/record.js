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

router.get('/view', async (req, res, next) => {
  //個案基本資料
  console.dir(req.params)
  const CaseRecordList = await db.CaseRecord.findOne({
    include: [
      { association: 'refcaseCreator' , attributes: ['username']},
      { association: 'refcaseManage' , attributes: ['username']},
      { association: 'refcaseAssign' , attributes: ['username']},
      { association: 'refIdentity' },
      { association: 'refSource' },
    ],
    where: { 
      id: 1 
    }
  })

  //危機評估
  let RefLevel = await db.RefLevel.findAll()
  //處理方式
  let RefProcess = await db.RefProcess.findAll()
  //主題來源
  let ThemeGroup1 = await db.RefTheme.findAll({where:{parentId:1}})
  let ThemeGroup2 = await db.RefTheme.findAll({where:{parentId:2}})
  let ThemeGroup3 = await db.RefTheme.findAll({where:{parentId:3}})
  let ThemeGroup4 = await db.RefTheme.findAll({where:{parentId:4}})

  res.render('record/record_view', { 
    title: '基本資料建檔',
    caseLevel: RefLevel,
    caseProcess: RefProcess,
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