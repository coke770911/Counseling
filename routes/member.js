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
  res.render('member/view', { title: '基本資料建檔'})
})


router.get('/', async (req, res, next) => {

})

router.post('/', upload.none(), async (req, res, next) => {
  const [createdata, created] = await db.Member.findOrCreate({
    where: { uid: req.body.uid.trim() },
    defaults: {
      uid: req.body.uid.trim(),
      name: req.body.name,
      birthday: req.body.birthday,
      sex: req.body.sex,
      marry: req.body.marry,
      cardId: req.body.cardId,
      dept: req.body.dept,
      grade: req.body.grade,
      class: req.body.class,
      mobile: req.body.mobile,
      tel: req.body.tel,
      email: req.body.email,
      is_contact: req.body.is_contact,
      address: req.body.address,
      regaddress: req.body.regaddress,
      contactName: req.body.contactName,
      contactRelation: req.body.contactRelation,
      contactTel: req.body.contactTel,
      contactPhone: req.body.contactPhone
    }
  })
  res.status(200).send(JSON.stringify({ msg: created ? '建立基本檔案完成。' : '已建立過檔案。' }))
})
router.put('/', upload.none(), async (req, res, next) => {})
router.delete('/', async (req, res, next) => {})


//取得由其他資料庫來的基本資料
router.get('/data/:id', async (req, res, next) => {
  let sql = '[dbo].[getMemberData] :uid';
  const memberdata = await db.sequelize.query(sql, {
    replacements: { uid: req.params.id },
    type: db.sequelize.QueryTypes.SELECT,
    nest: true
  })
  res.status(200).send(JSON.stringify(memberdata[0]))
})

module.exports = router