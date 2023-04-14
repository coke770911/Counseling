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
  let ReasonList = await db.RefReason.findAll({})
  let ThemeGroup1 = await db.RefTheme.findAll({where:{parentId:1}})
  let ThemeGroup2 = await db.RefTheme.findAll({where:{parentId:2}})
  let ThemeGroup3 = await db.RefTheme.findAll({where:{parentId:3}})
  let ThemeGroup4 = await db.RefTheme.findAll({where:{parentId:4}})
  res.render('record/view', { title: '基本資料建檔',ReasonList: ReasonList,ThemeGroup1: ThemeGroup1,ThemeGroup2: ThemeGroup2,ThemeGroup3: ThemeGroup3,ThemeGroup4: ThemeGroup4 })
})

router.get('/', async (req, res, next) => {})
router.post('/', upload.none(), async (req, res, next) => {})
router.put('/', upload.none(), async (req, res, next) => {})
router.delete('/', async (req, res, next) => {})

module.exports = router