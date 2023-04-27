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
  let CaseData = {
    id: req.query.id,
    memberUid: '',
    memberName: '',
    memberSex: '',
    memberDept: '',
    memberGrade: '',
    memberClass: '',
    memberIdentity: 1,
    memberSource: 1,
    caseManage: 1,
  }
  
  if(req.query.id === '0') {
    const MemberData = await db.Member.findOne({
      raw: true, 
      where:{ id: req.query.memberId }
    })
    CaseData.memberUid = MemberData.uid
    CaseData.memberName = MemberData.name
    CaseData.memberSex = MemberData.sex
    CaseData.memberDept = MemberData.dept
    CaseData.memberGrade = MemberData. grade
    CaseData.memberClass = MemberData.class
  } else {
    const MemberData = await db.CaseRecord.findOne({
      raw: true, 
      where:{ id: req.query.id }
    })
    CaseData = MemberData
  }

  //個案身份
  const RefIdentityList = await db.RefIdentity.findAll()
  //個案來源
  const RefSourceList = await db.RefSource.findAll()
  //個管員資料
  const UserList = await db.UserData.findAll({
    attributes: ['id', 'account', 'username', 'isDisabled'],
    include: [{
      model: db.UserAuth,
      attributes: ['id', 'titleName']
    }],
    where: {
      isDisabled: false,
      id: {
        [db.Sequelize.Op.ne]: 1
      }
    }
  })
  //console.dir(UserList)
  console.dir(CaseData)
  res.render('caserecord/caserecord_detailed',{ RefIdentityList: RefIdentityList, RefSourceList: RefSourceList, CaseData: CaseData , UserList: UserList})
})


router.get('/listview',(req, res, next) => {
  res.render('caserecord/caserecord_list')
})


//個案追蹤清單
router.get('/:user', async (req, res, next) => {
  
  if([1].indexOf(req.session.auth) !== -1) {}
  req.params.user
  let wherestr =  {id: 1}
  
  
  const CaseRecordList = await db.CaseRecord.findAll({
    include: [
      { association: 'refcaseCreator' , attributes: ['username']},
      { association: 'refcaseManage' , attributes: ['username']},
      { association: 'refcaseAssign' , attributes: ['username']},
      { association: 'refIdentity' },
      { association: 'refSource' },
    ],
    //where: wherestr,
    order: [['id', 'DESC']]
  })
  res.status(200).send(JSON.stringify(CaseRecordList))

})

//建立個案紀錄
router.post('/', upload.none() , async (req, res, next) => {
  //抓取個案資料。
  const MemberData = await db.Member.findOne({
    raw: true, 
    where:{ uid: req.body.memberUid }
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
        { memberSource: req.body.memberSource},
        { isClose: 0 }
      ],
    },
    defaults: {
      memberUid: MemberData.uid,
      memberName: MemberData.name,
      memberSex: MemberData.sex,
      memberDept: MemberData.dept,
      memberGrade: MemberData.grade,
      memberClass: MemberData.class,
      memberIdentity: req.body.memberIdentity,
      memberSource: req.body.memberSource,
      caseCreator: req.session.account,
      caseManage: req.body.caseManage,
    }
  })

  if(created) {
    res.status(200).send(JSON.stringify({msg: '建立完成。'}))
  } else {
    res.status(200).send(JSON.stringify({msg: '已有個案資料，尚未結案。'}))
  }

})

router.put('/', upload.none(), async (req, res, next) => {
  const updatedata = await db.CaseRecord.update({
    memberIdentity: req.body.memberIdentity,
    memberSource: req.body.memberSource,
    caseManage: req.body.caseManage
  },{
    where: {id: req.body.id}
  })
  console.dir(updatedata)
  res.status(200).send(JSON.stringify({msg: '更新完成。'}))
})

router.delete('/', async (req, res, next) => {
  const deleted = await db.CaseRecord.destroy({where: {id: req.query.id}})
  res.status(200).send(JSON.stringify({msg: deleted ? '已刪除個案追蹤資料。' : '刪除失敗。'}))
})



module.exports = router
