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
  //console.dir([1,2].indexOf(req.session.auth))
  //res.status(400).send(JSON.stringify({ msg: '尚未登入' }))
  next()
})

router.get('/view', async (req, res, next) => {
  res.render('room/view', { title: '諮商系統 空間設定' })
})

//載入新增or修改樣版
router.get('/detailed/:id', async (req, res, next) => {
  let RoomData = {
    id: 0,
    title: '',
    eventColor: '#3399FF',
    isDisabled: false,
  }
  const Room = await db.Room.findAll({ where: {id: req.params.id }})
  if(Room.length > 0 ) {
    RoomData = Room[0]
  }
  res.render('room/detailed', { title: '空間設定',RoomData: RoomData})
})

//取得目前可以使用的空間
router.get('/', async (req, res, next) => {
  const roomData = await db.Room.findAll({
    where: {isDisabled: 0}
  })
  res.status(200).send(JSON.stringify(roomData));
})
//新增空間
router.post('/', upload.none(), async (req, res, next) => {
  const [createdata, created] = await db.Room.findOrCreate({
    where: { title: req.body.title },
    defaults: {
      title: req.body.title,
      eventColor: req.body.eventColor,
      isDisabled: req.body.isDisabled || 0
    }
  })
  console.dir(req.body)
  res.status(200).send(JSON.stringify({ msg: created ? '新增成功' : '新增失敗' }))
})

router.put('/', upload.none(), async (req, res, next) => {
  let Datafield = {}
  Datafield.title = req.body.title
  Datafield.eventColor = req.body.eventColor
  Datafield.isDisabled = req.body.isDisabled || 0
  const updated = await db.Room.update(Datafield, {
    where: {
      id: req.body.rid
    }
  })
  res.status(200).send(JSON.stringify({ msg: updated ? '修改成功' : '修改成功' }))
})

router.delete('/', async (req, res, next) => {})

module.exports = router