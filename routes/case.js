const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const db = require('../models')

router.use((req, res, next) => {
  res.locals.user = req.session
  next()
})


router.get('/', async (req, res, next) => {
  const CaseRecordList = await db.CaseRecord.findAll({})
  res.status(200).send(JSON.stringify(CaseRecordList))
})

//建立個案紀錄
router.post('/', upload.none() , async (req, res, next) => {
  //抓取個案資料。
  const MemberData = await db.Member.findOne({
    raw: true, 
    where:{ id: req.body.memberId }
  })

  if(MemberData === null) {
    res.status(200).send(JSON.stringify({msg: '尚未建立個案基本資料。'}))
    return
  }

  //建立紀錄
  const [createdata, created] = await db.CaseRecord.findOrCreate({
    raw: true, 
    where: { 
      [db.Sequelize.Op.and]: [
        { memberUid: MemberData.uid }, 
        { isClose: 0 }
      ],
    },
    defaults: {
      memberUid: MemberData.uid,
      memberName: MemberData.name,
      memberGrade: MemberData.grade,
      memberClass: MemberData.class,
      caseCreator: req.session.account,
    }
  })

  console.dir(createdata)
  if(created) {
    res.status(200).send(JSON.stringify({msg: '已建立個案追蹤。'}))
  } else {
    res.status(200).send(JSON.stringify({msg: '已有個案資料，尚未結案。'}))
  }
})

router.put('/', async (req, res, next) => {

})

router.delete('/', async (req, res, next) => {

})



module.exports = router
