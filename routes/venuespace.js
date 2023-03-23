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
  console.dir([1,2].indexOf(req.session.auth))
  //res.status(400).send(JSON.stringify({ msg: '尚未登入' }))
  next()
})

router.get('/view', async (req, res, next) => {
  res.render('venuespace/view', { title: '諮商系統 空間設定' })
})

router.get('/detailed/:id', async (req, res, next) => {
  let VenueSpaceData = {
    id: 0,
    spaceName: '',
    isDisabled: false,
  }
  const VenueSpace = await db.VenueSpace.findAll({ where: {id: req.params.id }})
  if(VenueSpace.length > 0 ) 
    VenueSpaceData = VenueSpace[0]

  console.dir(VenueSpace);
  res.render('venuespace/detailed', { title: '諮商系統 權限設定',VenueSpaceData: VenueSpaceData})
})

router.get('/', async (req, res, next) => {
  const VenueSpaceData = await db.VenueSpace.findAll({})
  res.status(200).send(JSON.stringify(VenueSpaceData));
})

router.post('/', upload.none(), async (req, res, next) => {
  const [createdata, created] = await db.VenueSpace.findOrCreate({
    where: { spaceName: req.body.spaceName },
    defaults: {
      spaceName: req.body.spaceName,
      isDisabled: req.body.isDisabled || 0
    }
  })
  console.dir(req.body)
  res.status(200).send(JSON.stringify({ msg: created ? '新增成功' : '新增失敗' }))
})

router.put('/', upload.none(), async (req, res, next) => {
  let Datafield = {}
  Datafield.spaceName = req.body.spaceName
  Datafield.isDisabled = req.body.isDisabled || 0
  const updated = await db.VenueSpace.update(Datafield, {
    where: {
      id: req.body.vid
    }
  })
  res.status(200).send(JSON.stringify({ msg: updated ? '修改成功' : '修改成功' }))
})
router.delete('/', async (req, res, next) => {})

module.exports = router