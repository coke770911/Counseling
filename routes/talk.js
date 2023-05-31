const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const date = require('date-and-time')
const db = require('../models')

router.use((req, res, next) => {
  res.locals.user = req.session  
  if(!(req.session.login === true)) {
    res.render('login', { title: '諮商系統登入', Message: '尚未登入。'})
    return;
  }
  next()
})

//晤談紀錄清單
router.get('/listview', async (req, res, next) => {
  res.render('talkrecord/talkrecord_list', { title: '基本資料建檔'})
})

//晤談紀錄填寫
router.get('/view', async (req, res, next) => {
  //預設欄位資料
  let TalkRecordData = {
    id: 0,
    caseId: req.query.CaseRecordId || 0,
    keyinUser: req.session.account,
    keyinDate: date.format(new Date(),'YYYY-MM-DD HH:mm'),
    refProcessesId: 0,
    refLevelId: 0,
    refTheme: [],
    talkContent: '',
    processPlan: '',
  }
  
  //晤談紀錄編號 如果沒資料就是新增介面
  if(req.query.RecordId !== '0') {
    const TalkRecordOne = await db.TalkRecord.findOne({
      raw: true,
      include: [
        { association: 'refkeyinUser' , attributes: ['username'] },
      ],
      where: { id: req.query.RecordId }
    })
    if(TalkRecordOne !== null) {
      TalkRecordOne.keyinDate = date.format(TalkRecordOne.keyinDate,'YYYY-MM-DD HH:mm')
      TalkRecordOne.refTheme = TalkRecordOne.refTheme.split(',')
      TalkRecordData = TalkRecordOne
    }
  }
  
  //案件基本資料
  const CaseRecordData = await db.CaseRecord.findOne({
    include: [
      { association: 'refMember' , include: [
          { association: 'refCreator' , attributes: ['username'] },
          { association: 'refEditor' , attributes: ['username'] },
        ]},
      { association: 'refcaseCreator' , attributes: ['username'] },
      { association: 'refcaseManage' , attributes: ['username'] },
      { association: 'refcaseAssign' , attributes: ['username'] },
      { association: 'refIdentity' },
      { association: 'refSource' },
    ],
    where: { 
      id: TalkRecordData.caseId,
    }
  })

  if(req.query.RecordId === '0' && CaseRecordData.isClose) {
    res.status(400).send(JSON.stringify({msg: '已結案無法再填寫晤談紀錄。'}))
    return
  }

  
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

//取得資料清單為學號
router.get('/:user', async (req, res, next) => {
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
      keyinUser: req.session.account ,
      '$refCase.memberUid$': req.params.user,
    },
    order: [['updatedAt', 'DESC']]
  }

  if([1].indexOf(req.session.auth) !== -1) {
    TalkRecordObj.where = {
      '$refCase.deletedAt$': { [db.Sequelize.Op.is]: null },
      '$refCase.memberUid$': req.params.user,
    }
  }

  if([2].indexOf(req.session.auth) !== -1) {
    TalkRecordObj.where = {
      '$refCase.deletedAt$': { [db.Sequelize.Op.is]: null },
      '$refCase.caseManage$': req.session.account,
      '$refCase.memberUid$': req.params.user,
    }
  }
  const TalkRecordList = await db.TalkRecord.findAll(TalkRecordObj)
  res.status(200).send(JSON.stringify(TalkRecordList))

})

//取得資料列表
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
      keyinUser: req.session.account ,
    },
    order: [['updatedAt', 'DESC']]
  }

  if([1].indexOf(req.session.auth) !== -1) {
    TalkRecordObj.where = {
      '$refCase.deletedAt$': { [db.Sequelize.Op.is]: null },
    }
  }

  if([2].indexOf(req.session.auth) !== -1) {
    TalkRecordObj.where = {
      '$refCase.deletedAt$': { [db.Sequelize.Op.is]: null },
      '$refCase.caseManage$': req.session.account,
    }
  }

  const TalkRecordList = await db.TalkRecord.findAll(TalkRecordObj)
  res.status(200).send(JSON.stringify(TalkRecordList))
})

router.post('/', upload.none(), async (req, res, next) => {
  if(req.body.Theme === undefined ) {
    res.status(400).send(JSON.stringify({ msg: '晤談主題未選擇。'}))
    return 
  }

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

router.put('/', upload.none(), async (req, res, next) => {
  const updated = await db.TalkRecord.update({
    //keyinUser: req.session.account ,
    keyinDate: req.body.keyinDate ,
    refProcessesId: req.body.refProcessesId ,
    refLevelId: req.body.refLevelId ,
    refTheme: req.body.Theme.toString(),
    talkContent: req.body.talkContent,
    processPlan: req.body.processPlan,
  },{
    where: { id: req.body.TalkId }
  })
  res.status(200).send(JSON.stringify({msg: updated ? '已修改晤談紀錄資料。' : '修改失敗。'}))
})
router.delete('/', async (req, res, next) => {

})

module.exports = router
