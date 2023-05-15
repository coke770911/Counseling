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


router.get('/listview', async (req, res, next) => {
  res.render('talkrecord/talkrecord_list', { title: '基本資料建檔'})
})

router.get('/view', async (req, res, next) => {
  let d = new Date()
  console.dir(d.toISOString().slice(0,16))
  let TalkRecordData = {
    id: 0,
    caseId: req.query.CaseRecordId,
    keyinUser: req.session.account,
    keyinDate: d.toISOString().slice(0,16),
    refProcessesId: 0,
    refLevelId: 0,
    refTheme: [],
    talkContent: '',
    processPlan: '',
  }

  //晤談紀錄 如果沒資料就是新增
  const TalkRecordOne = await db.TalkRecord.findOne({
    include: [
      { association: 'refkeyinUser' , attributes: ['username']},
    ],
    where: {id: req.query.RecordId}
  })
  //console.dir(JSON.stringify(TalkRecordData,null,4))
  //console.dir(TalkRecordData)

  //個案基本資料
  const CaseRecordData = await db.CaseRecord.findOne({
    include: [
      { association: 'refcaseCreator' , attributes: ['username']},
      { association: 'refcaseManage' , attributes: ['username']},
      { association: 'refcaseAssign' , attributes: ['username']},
      { association: 'refIdentity' },
      { association: 'refSource' },
    ],
    where: { 
      id: req.query.CaseRecordId
    }
  })
  //console.dir(JSON.stringify(TalkRecordData,null,4))
  //危機評估 陣列
  let RefLevel = await db.RefLevel.findAll()
  //處理方式 陣列
  let RefProcess = await db.RefProcess.findAll()
  //主題來源 陣列
  let ThemeGroup1 = await db.RefTheme.findAll({ where: { parentId: 1 }})
  let ThemeGroup2 = await db.RefTheme.findAll({ where: { parentId: 2 }})
  let ThemeGroup3 = await db.RefTheme.findAll({ where: { parentId: 3 }})
  let ThemeGroup4 = await db.RefTheme.findAll({ where: { parentId: 4 }})

  res.render('talkrecord/talkrecord_view', { 
    title: '晤談記錄建檔',
    CaseRecordData: CaseRecordData,
    TalkRecordData: TalkRecordData,
    CalendarId: req.query.CalendarId || 0,
    caseLevel: RefLevel,
    caseProcess: RefProcess,
    ThemeGroup1: ThemeGroup1,
    ThemeGroup2: ThemeGroup2,
    ThemeGroup3: ThemeGroup3,
    ThemeGroup4: ThemeGroup4 
  })
})

//取得資料
router.get('/', async (req, res, next) => {
  let TalkRecordObj = {
    required: true,
    include: [
      { association: 'refCase', attributes: ['memberUid','memberName','memberSex','memberDept','memberGrade','memberClass','memberDeptFull']},
      { association: 'refkeyinUser' , attributes: ['username']},
      { association: 'refProcess' , attributes: ['content']},
      { association: 'refLevel' , attributes: ['content']},
    ],
    where: {
      '$refCase.deletedAt$': { [db.Sequelize.Op.is]: null },
      memberUid: req.params.user ,
      caseAssign: req.session.account ,
      isClose: 0 
    },
    order: [['id', 'DESC']]
  }

  if([2].indexOf(req.session.auth) !== -1) {
    wherestr = {
      [db.Sequelize.Op.and]: [
        { memberUid: req.params.user },
        { caseManage: req.session.account },
      ] 
    }
  }

  const TalkRecordList = await db.TalkRecord.findAll(TalkRecordObj)
  res.status(200).send(JSON.stringify(TalkRecordList))
})

router.post('/', upload.none(), async (req, res, next) => {
  /*
  console.dir(req.body)
  res.status(200).send(JSON.stringify({ msg: 123}))
  return */
  /*
  const createdata = await db.TalkRecord.create({
    caseId: req.body.CaseId ,
    keyinUser: req.session.account ,
    keyinDate: req.body.keyinDate ,
    refProcessesId: req.body.refProcessesId ,
    refLevelId: req.body.refLevelId ,
    refTheme: req.body.Theme.toString(),
    talkContent: req.body.talkContent,
    processPlan: req.body.processPlan,
  })
  */
  const [createdata, created] = await db.TalkRecord.findOrCreate({
    raw: true, 
    where: { 
      [db.Sequelize.Op.and]: [
        { caseId: req.body.CaseId }, 
        { keyinUser: req.session.account }, 
        { keyinDate: req.body.keyinDate },
      ],
    },
    defaults: {
      caseId: req.body.CaseId ,
      keyinUser: req.session.account ,
      keyinDate: req.body.keyinDate ,
      refProcessesId: req.body.refProcessesId ,
      refLevelId: req.body.refLevelId ,
      refTheme: req.body.Theme.toString(),
      talkContent: req.body.talkContent,
      processPlan: req.body.processPlan,
    }
  })
  res.status(200).send(JSON.stringify({ msg: created ? '建立晤談紀錄完成。' : '建立晤談紀錄失敗，已有相同晤談紀錄資料。'}))
})

router.put('/', upload.none(), async (req, res, next) => {})
router.delete('/', async (req, res, next) => {})

module.exports = router
