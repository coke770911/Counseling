const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const db = require('../models')

router.use((req, res, next) => {
  res.locals.user = req.session
  next()
})

//建立個案UI
router.get('/view', async (req, res, next) => {
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
