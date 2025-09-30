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
  next()
})

//依學群、系所統計諮商人數人次
router.get('/DeptRecord', async (req, res, next) => {
  let isEdit = [1,2,3,4].indexOf(req.session.auth) === -1 ? false : true
  res.render('report/DeptRecord', { title: '統計報表',isEdit: isEdit})
})

router.post('/data1', upload.none(),async (req, res, next) => {
  let paramter = {
    replacements: {
      sdate: req.body.sdate,
      edate: req.body.edate
    }
  }
  const queryData = await db.sequelize.query('[Counseling].[dbo].[getDeptTalkCount] :sdate , :edate ;' , paramter);
  res.status(200).send(JSON.stringify(queryData[0]))
})

/**
 * 取得晤談紀錄原始資料
 */
router.get('/TalkAllRecord', async (req, res, next) => {
  let isEdit = [1,2,3,4].indexOf(req.session.auth) === -1 ? false : true
  res.render('report/TalkAllRecord', { title: '晤談紀錄原始資料',isEdit: isEdit})
})

router.post('/TalkAllRecord', upload.none(),async (req, res, next) => {
  let paramter = {
    replacements: {
      sdate: req.body.sdate,
      edate: req.body.edate
    }
  }
  const queryData = await db.sequelize.query('[Counseling].[dbo].[getTalkAllRecord] :sdate , :edate ;' , paramter);
  res.status(200).send(JSON.stringify(queryData[0]))
})

/**
 * 取得個案紀錄原始資料
 */
router.get('/CaseAllRecord', async (req, res, next) => {
  let isEdit = [1,2,3,4].indexOf(req.session.auth) === -1 ? false : true
  res.render('report/CaseAllRecord', { title: '晤談紀錄原始資料',isEdit: isEdit})
})

router.post('/CaseAllRecord', upload.none(),async (req, res, next) => {
  let paramter = {
    replacements: {
      sdate: req.body.sdate,
      edate: req.body.edate
    }
  }
  const queryData = await db.sequelize.query('[Counseling].[dbo].[getCaseAllRecord] :sdate , :edate ;' , paramter);
  res.status(200).send(JSON.stringify(queryData[0]))
})

/**
 * 依學期取得心理假原始資料
 */
router.get('/PsyLeaveRecord', async (req, res, next) => {
  let isEdit = [1,2,3,4].indexOf(req.session.auth) === -1 ? false : true
  const currentYear = new Date().getFullYear(); // 取得西元年
  const taiwanYear = currentYear - 1911; // 轉換為中華民國年
  const semesters = []; // 儲存倒序學期資料

  // 迴圈生成倒序學期資料
  for (let year = taiwanYear; year >= taiwanYear - 5; year--) { // 產生最近10年
    semesters.push(`${year}1`); // 上學期
    semesters.push(`${year}2`); // 下學期
  }
  semesters: semesters.sort((a, b) => b.localeCompare(a))
  res.render('report/PsyLeaveRecord', { title: '晤談紀錄原始資料',isEdit: isEdit,semesters:semesters})
})

router.post('/PsyLeaveRecord', upload.none(),async (req, res, next) => {
  let paramter = {
    replacements: {
      smtr: req.body.smtr,
    }
  }
  const queryData = await db.sequelize.query('[Counseling].[dbo].[getPsyLeaveRecord] :smtr ;' , paramter);
  res.status(200).send(JSON.stringify(queryData[0]))
})


module.exports = router
