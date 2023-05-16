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
  //console.dir(req.session)
  //res.status(400).send(JSON.stringify({ msg: '尚未登入' }))
  next()
})

//基本資料建檔介面
router.get('/view/:id', async (req, res, next) => {
  let memberData = {
    uid: '',
    cardId: '',
    name: '',
    birthday: '',
    sex: '',
    marry: 0,
    dept: '',
    grade: '',
    class: '',
    mobile: '',
    tel: '',
    email: '',
    isContact: 1,
    address: '',
    regaddress: '',
    contactName: '',
    contactRelation: '',
    contactTel: '',
    contactPhone: '',
    creator: req.session.account,
    creatorName: req.session.username,
    editor: req.session.account,
    editorName: req.session.username,
    updatedLocal: new Date().toLocaleString(),
  }
  memberData.creatorName = req.session.username
  memberData.editorName = req.session.username

  if(req.params.id !== 'new') {
    memberData = await db.Member.findOne({
      include: [
        { association: 'refCreator' , attributes: ['username']},
        { association: 'refEditor' , attributes: ['username']},
      ],
      where: { id: req.params.id }
    })
    console.dir(memberData)
    memberData.creatorName = memberData.refCreator.username
    memberData.editorName = memberData.refEditor.username
  }
  
  res.render('member/member_view', { title: '基本資料建檔',memberData: memberData})
})

//個案資料列表介面
router.get('/listview', async (req, res, next) => {
  res.render('member/member_list', { title: '基本資料建檔'})
})

//取得單筆
router.get('/:uid', async (req, res, next) => {
  const MemberData = await db.Member.findOne({
    include: [
      { association: 'refCreator' , attributes: ['username']},
      { association: 'refEditor' , attributes: ['username']},
    ],
    where: { uid: req.params.uid }
  })
  res.status(200).send(JSON.stringify([MemberData]))
})

//取得多筆
router.get('/', async (req, res, next) => {
  const MemberList = await db.Member.findAll({
    include: [
      { association: 'refCreator' , attributes: ['username']},
      { association: 'refEditor' , attributes: ['username']},
    ],
    order: [['updatedAt','DESC']],
  });
  res.status(200).send(JSON.stringify(MemberList))
})

//建立基本資料檔
router.post('/', upload.none(), async (req, res, next) => {
  if(req.body.uid.trim() === '') {
    res.status(400).send(JSON.stringify({ msg: '建檔資料有錯誤。' }))
    return
  }

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
      isContact: req.body.isContact,
      address: req.body.address,
      regaddress: req.body.regaddress,
      contactName: req.body.contactName,
      contactRelation: req.body.contactRelation,
      contactTel: req.body.contactTel,
      contactPhone: req.body.contactPhone,
      creator: req.session.account,
      editor: req.session.account,
    }
  })
  res.status(200).send(JSON.stringify({ msg: created ? '建立基本檔案完成。' : '已建立過檔案。' }))
})


router.put('/', upload.none(), async (req, res, next) => {
  const updated = await db.Member.update({
      name: req.body.name,
      sex: req.body.sex,
      marry: req.body.marry,
      dept: req.body.dept,
      grade: req.body.grade,
      class: req.body.class,
      mobile: req.body.mobile,
      tel: req.body.tel,
      email: req.body.email,
      isContact: req.body.isContact,
      address: req.body.address,
      regaddress: req.body.regaddress,
      contactName: req.body.contactName,
      contactRelation: req.body.contactRelation,
      contactTel: req.body.contactTel,
      contactPhone: req.body.contactPhone,
      editor: req.session.username,
    },{where: { uid: req.body.uid.trim() }},
  )
  console.dir(updated)
  res.status(200).send(JSON.stringify({ msg: updated ? '更新檔案完成。' : '更新失敗。' }))
})
router.delete('/', async (req, res, next) => {})


//取得由其他資料庫來的基本資料
router.get('/data/:uid', async (req, res, next) => {
  let sql = '[dbo].[getMemberData] :uid';
  const memberdata = await db.sequelize.query(sql, {
    replacements: { uid: req.params.uid },
    type: db.sequelize.QueryTypes.SELECT,
    nest: true
  })
  res.status(200).send(JSON.stringify(memberdata[0]))
})

module.exports = router