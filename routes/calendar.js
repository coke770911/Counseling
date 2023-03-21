const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const db = require('../models')

router.use((req, res, next) => {
  res.locals.user = req.session
  next()
})

router.get('/view', async (req, res, next) => {
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
  res.render('calendar/calendar', { title: '諮商系統 行事曆', setstaff, setspace })
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

// 撈取行事曆
router.get('/', async (req, res, next) => {
  const Calendardata = await db.CalendarData.findAll({})
  res.status(200).send(JSON.stringify({ msg: '搜尋成功', Calendardata: Calendardata }))
})

// 新增行事曆
router.post('/', upload.none(), async (req, res, next) => {
  const Calendardata = await db.CalendarData.create({
    title: req.body.title,
    content: req.body.content || '',
    setstaff: req.body.setstaff,
    venuespaceId: req.body.setspace,
    start: req.body.start,
    end: req.body.end,
    allDay: req.body.allDay || 0,
    creatorPople: req.session.account,
    modifyPople: req.session.account
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
