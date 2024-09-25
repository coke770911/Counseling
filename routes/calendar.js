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

//行事曆介面
router.get('/view', async (req, res, next) => {
  let isEdit = [1,2,3,4].indexOf(req.session.auth) === -1 ? false : true
  res.render('calendar/calendar_view', { title: '行事曆',isEdit: isEdit})
})

//新增行程介面
router.post('/detailed', upload.none(), async (req, res, next) => {
  if([1,2,3,4].indexOf(req.session.auth) === -1) {
    res.status(400).send(JSON.stringify({ msg: '權限不足！'}))
    return
  }

  const UserData = await db.UserData.findAll({
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
    },
    order: [
      [db.UserAuth,'id','desc']
    ]
  })
  const CaseRecordList = await db.CaseRecord.findAll({
    include: [
      { association: 'refcaseManage' , attributes: ['username']},
      { association: 'refcaseAssign' , attributes: ['username']},
      { association: 'refIdentity' },
      { association: 'refSource' },
    ],
    where: {
      isClose: 0 
    },
    order: [['updatedAt', 'DESC']]
  })

  const RoomData = await db.Room.findAll({ where: { isDisabled: false } })
  let CalendarData = {};
  CalendarData.id = req.body.id
  CalendarData.major = 0
  CalendarData.title = ''
  CalendarData.content = ''
  CalendarData.start = new Date(req.body.start).toISOString()
  CalendarData.end = new Date(req.body.end).toISOString()
  CalendarData.allDay = req.body.allDay
  CalendarData.resourceId = req.body.resourceId

  res.render('calendar/calendar_detailed', { title: '新增事件',UserData,RoomData,CalendarData: CalendarData , CaseRecordList: CaseRecordList})
})

//查詢行事曆事件資訊
router.get('/info/:id', async (req, res, next) => {
  const CalendarData = await db.Calendar.findOne({
    attributes: [
      'id','title','caserecordId','caseAssign','start','end','allDay',['RoomId','resourceId'],
      [db.Sequelize.col('refcaseAssign.color'),'color'],
      [db.Sequelize.col('refcaseAssign.textColor'),'textColor']
    ],
    include: [
      { association: 'refcaseAssign' , attributes: ['username']},
      { association: 'refcaseCreator' , attributes: ['username']},
      db.CaseRecord,
      db.Room,
    ],
    where: {
      id: req.params.id 
    }
  })
  
  console.log(JSON.stringify(res.locals.user,null,4))
  console.log(JSON.stringify(CalendarData,null,4))

  res.render('calendar/calendar_info',{CalendarData: CalendarData})
})


//撈取行事曆
router.get('/', async (req, res, next) => {
  const Calendardata = await db.Calendar.findAll({
    attributes: [
      'id','title','caserecordId','caseAssign','start','end','allDay',['RoomId','resourceId'],
      [db.Sequelize.col('refcaseAssign.color'),'color'],
      [db.Sequelize.col('refcaseAssign.textColor'),'textColor']
    ],
    include: [
      { association: 'refcaseAssign' , attributes: ['username','color','textColor']},
    ],
    where: {
      start: {
        [db.Sequelize.Op.between]: [req.query.start,req.query.end]
      }
    }
  })
  res.status(200).send(JSON.stringify(Calendardata))
})

//新增行事曆
router.post('/', upload.none(), async (req, res, next) => {
  let Calendardata = []
  let start = new Date(req.body.start)
  let end = new Date(req.body.end)
  let i = 0
  let title = req.body.title

  if(title === '') {
    res.status(400).send(JSON.stringify({ msg: '請輸入事件標題。', Calendardata }))
    return 
  }

  if(req.body.caserecordId !== '0' || req.body.caseAssign !== '') {
    title = req.body.caseAssignName + '&' + title
  }

  //案件寫入派任心理師
  db.CaseRecord.update({
    caseAssign: req.body.caseAssign,
  },{
    where: {
      id: req.body.caserecordId
    }
  })

  do {
    let Calendar = await db.Calendar.create({
      title: title,
      content: req.body.content,
      caserecordId: req.body.caserecordId || '',
      caseAssign: req.body.caseAssign,
      roomId: req.body.roomId,
      start: start,
      end: end,
      allDay: req.body.allDay || 0,
      creator: req.session.account,
      editor: req.session.account
    }) 
    Calendardata.push(Calendar)
    start.setDate(start.getDate() + 7)
    end.setDate(end.getDate() + 7)
    i += 1
  } while (i <= req.body.weekrepeat);
  res.status(200).send(JSON.stringify({ msg: '新增成功', Calendardata }))
})

// 移動行事曆行程時間
router.put('/', upload.none(), async (req, res, next) => {
  const Calendardata = await db.Calendar.update({ 
    start: req.body.start, 
    end: req.body.end === 'null' ? null : req.body.end, 
    allDay: req.body.allDay,
    roomId: req.body.resourceId === 'null' ? null : req.body.resourceId,
    editor: req.session.account
    }, { where: { id: req.body.id } 
  })
  res.status(200).send(JSON.stringify({ msg: '修改成功'}))
})

//刪除行事曆行程
router.delete('/:id', async (req, res, next) => {
  const Calendardata = await db.Calendar.destroy({ where: { id: req.params.id }})
  res.status(200).send(JSON.stringify({ msg: '已刪除事件！', Calendardata: Calendardata }))
})

module.exports = router
