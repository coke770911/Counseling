const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const db = require('../models')

router.use((req, res, next) => {
  res.locals.user = req.session
  next()
})

//行事曆介面
router.get('/view', async (req, res, next) => {
  let isReadonly = [1,2].indexOf(req.session.auth) === -1 ? false : true
  res.render('calendar/view', { title: '行事曆',isReadonly: isReadonly})
})

//新增與查詢
router.get('/detailed/:id', async (req, res, next) => {
  if([1,2].indexOf(req.session.auth) === -1) {
    res.status(200).send(JSON.stringify({ msg: '權限不足！'}))
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
    }
  })

  const RoomData = await db.Room.findAll({ where: { isDisabled: false } })
  res.render('calendar/detailed', { title: '新增事件',UserData,RoomData})
})

//新增與查詢
router.post('/detailed', upload.none(), async (req, res, next) => {
  if([1,2].indexOf(req.session.auth) === -1) {
    res.status(200).send(JSON.stringify({ msg: '權限不足！'}))
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
    }
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

  console.dir(req.body)

  const Calendar = await db.Calendar.findAll({})

  res.render('calendar/detailed', { title: '新增事件',UserData,RoomData,CalendarData: CalendarData})
})

router.get('/add', async (req, res, next) => {
  const setstaff = await db.UserData.findAll({
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
  const setspace = await db.VenueSpace.findAll({ where: { isDisabled: false } })
  res.render('calendar/add', { title: '諮商系統 行事曆', setstaff, setspace })
})
/*
router.get('/detailed/:id', async (req, res, next) => {
  let sql = "SELECT cd.content,cd.[id],cd.[title],cd.[setstaff],ISNULL(staff.username,'無') AS staffName,ISNULL(ua.titleName,'無') AS titleName,cd.[venuespaceId],ISNULL(vs.spaceName,'無') AS spaceName,cd.[start],cd.[end],cd.[allDay],cd.[creatorPople],ca.username AS creatorPopleName,cd.[modifyPople],md.username AS modifyPopleName "
  sql += ' FROM [Counseling].[dbo].[CalendarData] AS cd '
  sql += ' LEFT JOIN [Counseling].[dbo].[VenueSpaces] AS vs ON vs.id = cd.[venuespaceId] '
  sql += ' LEFT JOIN [Counseling].[dbo].[UserData] AS staff ON staff.account = cd.[setstaff] '
  sql += ' LEFT JOIN [Counseling].[dbo].[UserAuths] AS ua ON ua.id = staff.userauthId  '
  sql += ' LEFT JOIN [Counseling].[dbo].[UserData] AS ca ON ca.account = cd.[creatorPople] '
  sql += ' LEFT JOIN [Counseling].[dbo].[UserData] AS md ON md .account = cd.[modifyPople] '
  sql += ' WHERE cd.[deletedAt] IS NULL AND cd.id = :id'
  const Calendardata = await db.sequelize.query(sql, {
    replacements: { id: req.params.id },
    type: db.sequelize.QueryTypes.SELECT,
    nest: true
  })
  console.dir(Calendardata)
  res.render('calendar/detailed', { Calendardata: Calendardata[0], aa: 'abc' })
})
*/
// 撈取行事曆
router.get('/', async (req, res, next) => {
  const Calendardata = await db.Calendar.findAll({})
  res.status(200).send(JSON.stringify(Calendardata))
})

//新增行事曆
router.post('/', upload.none(), async (req, res, next) => {
  const Calendardata = await db.Calendar.create({
    title: req.body.title,
    content: req.body.content,
    memberId: req.body.memberId || '',
    major: req.body.major,
    roomId: req.body.roomId,
    start: req.body.start,
    end: req.body.end,
    allDay: req.body.allDay || 0,
    creator: req.session.account,
    editor: req.session.account
  }) 
  res.status(200).send(JSON.stringify({ msg: '新增成功', Calendardata }))
})

// 移動行事曆行程時間
router.put('/', upload.none(), async (req, res, next) => {
  const Calendardata = await db.CalendarData.update({ start: req.body.start, end: req.body.end === 'null' ? null : req.body.end, modifyPople: req.session.account,allDay: req.body.allDay }, { where: { id: req.body.id } })
  res.status(200).send(JSON.stringify({ msg: '修改成功'}))
})
//刪除行事曆行程
router.delete('/:id', async (req, res, next) => {
  const Calendardata = await db.CalendarData.destroy({where: {id: req.params.id }})
  res.status(200).send(JSON.stringify({ msg: '已刪除行程！', Calendardata: Calendardata }))
})

module.exports = router
