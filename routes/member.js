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
  let ThemeList = await db.RefTheme.findAll({})
  console.dir(ReasonList);
  console.dir(ThemeList);
  res.render('member/view', { title: '基本資料建檔',ReasonList: ReasonList,ThemeList: ThemeList })
})


router.get('/', async (req, res, next) => {})
router.post('/', upload.none(), async (req, res, next) => {})
router.put('/', upload.none(), async (req, res, next) => {})
router.delete('/', async (req, res, next) => {})

module.exports = router