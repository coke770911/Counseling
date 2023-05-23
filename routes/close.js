const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const db = require('../models')
const date = require('date-and-time')

router.use((req, res, next) => {
  res.locals.user = req.session
  next()
})

//建立個案UI
router.get('/view', async (req, res, next) => {

  
  const TalkRecordOne = await db.TalkRecord.findAll({
    raw: true,
    where: { id: req.query.RecordId }
  })
  /*
  TalkRecordOne.keyinDate = date.format(TalkRecordOne.keyinDate,'YYYY-MM')
  TalkRecordOne.refTheme = TalkRecordOne.refTheme.split(',')
  TalkRecordData = TalkRecordOne
 */

  let CloseRecordData = {
    caseId: 0,
    closeReason: 0,
    keyinUser: '',
    refTheme: '',
    evaluationAnalysis: '',
    targetAchievement: '',
    processed: '',
    futureAdvice: '',
    dateStart: '',
    dateEnd: '',
  }


  let RefCloseItem = await db.RefCloseItem.findAll()
  //主題來源 陣列
  let ThemeGroup1 = await db.RefTheme.findAll({ where: { parentId: 1 }})
  let ThemeGroup2 = await db.RefTheme.findAll({ where: { parentId: 2 }})
  let ThemeGroup3 = await db.RefTheme.findAll({ where: { parentId: 3 }})
  let ThemeGroup4 = await db.RefTheme.findAll({ where: { parentId: 4 }})
  res.render('close/closerecord_view',{
    RefCloseItem: RefCloseItem,
    ThemeGroup1: ThemeGroup1,
    ThemeGroup2: ThemeGroup2,
    ThemeGroup3: ThemeGroup3,
    ThemeGroup4: ThemeGroup4,
  })
})

router.get('/listview',(req, res, next) => {
  res.render('caserecord/caserecord_list')
})

//個案追蹤清單
router.get('/', async (req, res, next) => {
  
  
  res.status(200).send(JSON.stringify())
})

//指定個案追蹤清單
router.get('/:user', async (req, res, next) => {
  res.status(200).send(JSON.stringify())
})

//建立個案紀錄
router.post('/', upload.none() , async (req, res, next) => {
  //res.status(200).send(JSON.stringify({msg: created ? '建立完成。' : '已有個案資料，尚未結案。'}))
})
//更新個案派案資料
router.put('/', upload.none(), async (req, res, next) => {
  //res.status(200).send(JSON.stringify({msg: updated ? '更新完成。' : '更新失敗。'}))
})

//刪除個案追蹤
router.delete('/', async (req, res, next) => {})

module.exports = router
