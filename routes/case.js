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
  res.render('caserecord/caserecord_detailed',{ RefIdentityList: RefIdentityList, RefSourceList: RefSourceList, CaseData: CaseData , UserList: UserList})
})

router.get('/listview',(req, res, next) => {
  res.render('caserecord/caserecord_list')
})

router.get('/state/:id', async (req, res, next) => {
  const CaseRecordData = await db.CaseRecord.findOne({ where: { id: req.params.id }})
  if(CaseRecordData.isClose)
    res.status(400).send(JSON.stringify({msg: '個案已結案。'}))
  else
    res.status(200).send(JSON.stringify({msg: '個案追蹤中。'}))
})

//個案追蹤清單
router.get('/', async (req, res, next) => {
  let CaseRecordObj = {
    attributes: [
    'id'
    ,'memberUid'
    ,'memberName'
    ,'memberSex'
    ,'memberDept'
    ,'memberGrade'
    ,'memberClass'
    ,'memberDeptFull'
    ,'memberIdentity'
    ,'memberSource'
    ,'isClose'
    ,'createdAt'
    ,'updatedAt'
    ,'deletedAt'
    ,'isCloseName'
    ,'createdLocal'
    ],
    include: [
      { association: 'refcaseCreator' , attributes: ['username']},
      { association: 'refcaseManage' , attributes: ['username']},
      { association: 'refcaseAssign' , attributes: ['username']},
      { association: 'refIdentity' , attributes: ['content']},
      { association: 'refSource' , attributes: ['content']},
      { association: 'hasTalkRecord' , 
        include: [
          { association: 'refCase', attributes: ['memberUid','memberName','memberSex','memberDept','memberGrade','memberClass','memberDeptFull']},
          { association: 'refkeyinUser' , attributes: ['username']},
          { association: 'refProcess' , attributes: ['content']},
          { association: 'refLevel' , attributes: ['content']},
        ],
        required: false
      },
    ],
    order: [['updatedAt', 'DESC'],['isClose','DESC']]
  }
  
  //個管員
  if([2].indexOf(req.session.auth) !== -1) {
    CaseRecordObj.where = {
      caseManage: req.session.account
    }
  }

  //心理師
  if([3,4].indexOf(req.session.auth) !== -1) {
    CaseRecordObj.where = {
      isClose: 0 ,
      caseAssign: req.session.account ,   
    }
    CaseRecordObj.include[5].where = { keyinUser: req.session.account }
  }
  

  const CaseRecordList = await db.CaseRecord.findAll(CaseRecordObj)
  res.status(200).send(JSON.stringify(CaseRecordList))
})

//指定個案追蹤清單
router.get('/:user', async (req, res, next) => {
  let CaseRecordObj = {
    attributes: [
    'id'
    ,'memberUid'
    ,'memberName'
    ,'memberSex'
    ,'memberDept'
    ,'memberGrade'
    ,'memberClass'
    ,'memberDeptFull'
    ,'memberIdentity'
    ,'memberSource'
    ,'isClose'
    ,'createdAt'
    ,'updatedAt'
    ,'deletedAt'
    ,'isCloseName'
    ,'createdLocal'
    ],
    include: [
      { association: 'refcaseCreator' , attributes: ['username']},
      { association: 'refcaseManage' , attributes: ['username']},
      { association: 'refcaseAssign' , attributes: ['username']},
      { association: 'refIdentity' , attributes: ['content']},
      { association: 'refSource' , attributes: ['content']},
      { association: 'hasTalkRecord' , 
        include: [
          { association: 'refCase', attributes: ['memberUid','memberName','memberSex','memberDept','memberGrade','memberClass','memberDeptFull']},
          { association: 'refkeyinUser' , attributes: ['username']},
          { association: 'refProcess' , attributes: ['content']},
          { association: 'refLevel' , attributes: ['content']},
        ],
        required: false
      },
    ],
    where: { memberUid: req.params.user },
    order: [['updatedAt', 'DESC'],['isClose','DESC']]
  }
  
  if([2].indexOf(req.session.auth) !== -1) {
    CaseRecordObj.where = {
      caseManage: req.session.account , 
      memberUid: req.params.user 
    }
  }

  if([3,4].indexOf(req.session.auth) !== -1) {
    CaseRecordObj.where = {
      isClose: 0 ,
      caseAssign: req.session.account ,   
      memberUid: req.params.user
    }
  }

  const CaseRecordList = await db.CaseRecord.findAll(CaseRecordObj)
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

  //建立個案追蹤紀錄
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
      caseAssign: req.body.caseAssign,
    }
  })
  res.status(200).send(JSON.stringify({msg: created ? '建立完成。' : '已有個案資料，尚未結案。'}))
})
//更新個案派案資料
router.put('/', upload.none(), async (req, res, next) => {
  const updated = await db.CaseRecord.update({
    memberIdentity: req.body.memberIdentity,
    memberSource: req.body.memberSource,
    caseManage: req.body.caseManage,
    caseAssign: req.body.caseAssign,
  },{
    where: {id: req.body.id}
  })
  res.status(200).send(JSON.stringify({msg: updated ? '更新完成。' : '更新失敗。'}))
})
//刪除個案追蹤
router.delete('/', async (req, res, next) => {
  const deleted = await db.CaseRecord.destroy({where: {id: req.query.id}})
  res.status(200).send(JSON.stringify({msg: deleted ? '已刪除個案追蹤資料。' : '刪除失敗。'}))
})

module.exports = router
