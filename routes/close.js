const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const db = require('../models')
const date = require('date-and-time')

router.use((req, res, next) => {
  res.locals.user = req.session  
  if(!(req.session.login === true)) {
    res.render('login', { title: '諮商系統登入', Message: '尚未登入。'})
    return;
  }
  next()
})

//建立個案UI
router.get('/view', async (req, res, next) => {
  let CloseRecordData = {
    caseId: req.query.CaseRecordId,
    closeReason: 0,
    keyinUser: '',
    refTheme: [],
    evaluationAnalysis: '',
    targetAchievement: '',
    processed: '',
    futureAdvice: '',
    keinUsername: req.session.username
  }

  //如果有結案資料的話就撈取
  const CloseRecordOne = await db.CloseRecord.findOne({
    include: [{ association: 'refkeyinUser' , attributes: ['username']}],
    where: { caseId: CloseRecordData.caseId }
  })
  
  if(CloseRecordOne !== null) {
    CloseRecordOne.refTheme = CloseRecordOne.refTheme.split(',')
    CloseRecordOne.keinUsername = CloseRecordOne.refkeyinUser.username
    CloseRecordData = CloseRecordOne
  }

  //抓取筆數 如果一筆都沒有表示沒有晤談紀錄 不可以結案
  const { count, rows } = await db.TalkRecord.findAndCountAll({
    raw: true,
    where: { caseId: CloseRecordData.caseId },
    order: ['keyinDate']
  })

  if(count === 0) {
    res.status(400).send(JSON.stringify({msg: '尚未有晤談紀錄無法結案。'}))
    return
  }
  CloseRecordData.dateStart = date.format(rows[0].keyinDate,'YYYY-MM')
  CloseRecordData.dateEnd = date.format(rows[count-1].keyinDate,'YYYY-MM')

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
      id: CloseRecordData.caseId,
    }
    
  })

  let RefCloseItem = await db.RefCloseItem.findAll()
  //主題來源 陣列
  let ThemeGroup1 = await db.RefTheme.findAll({ where: { parentId: 1 }})
  let ThemeGroup2 = await db.RefTheme.findAll({ where: { parentId: 2 }})
  let ThemeGroup3 = await db.RefTheme.findAll({ where: { parentId: 3 }})
  let ThemeGroup4 = await db.RefTheme.findAll({ where: { parentId: 4 }})

  res.render('close/closerecord_view',{
    CaseRecordData: CaseRecordData,
    CloseRecordData: CloseRecordData,
    RefCloseItem: RefCloseItem,
    ThemeGroup1: ThemeGroup1,
    ThemeGroup2: ThemeGroup2,
    ThemeGroup3: ThemeGroup3,
    ThemeGroup4: ThemeGroup4,
  })
  
})

//建立結案紀錄
router.post('/', upload.none() , async (req, res, next) => {
  if(req.body.Theme === undefined ) {
    res.status(400).send(JSON.stringify({ msg: '結案主題未選擇。'}))
    return 
  }

  const [createdata, created] = await db.CloseRecord.findOrCreate({
    raw: true, 
    where: { 
      [db.Sequelize.Op.and]: [
        { caseId: req.body.CaseId }, 
        { keyinUser: req.session.account }, 
      ],
    },
    defaults: {
      caseId: req.body.CaseId,
      closeReason: req.body.closeReason,
      keyinUser: req.session.account,
      refTheme: req.body.Theme.toString(),
      evaluationAnalysis: req.body.evaluationAnalysis,
      targetAchievement: req.body.targetAchievement,
      processed: req.body.processed,
      futureAdvice: req.body.futureAdvice,
    }
  })

  //案件狀態改為結案
  if(created) {
    const updated = await db.CaseRecord.update({ isClose: true },{ where: { id: req.body.CaseId } })
  }

  res.status(200).send(JSON.stringify({ msg: created ? '建立結案紀錄已完成。' : '建立晤結案紀錄失敗，已建立過結案紀錄。'})) 
})
//更新個案派案資料
router.put('/', upload.none(), async (req, res, next) => {

  //res.status(200).send(JSON.stringify({msg: updated ? '更新完成。' : '更新失敗。'}))
})

//刪除個案追蹤
router.delete('/', async (req, res, next) => {})

module.exports = router
