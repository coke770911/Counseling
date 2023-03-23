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
  const VenueSpaceData = await db.VenueSpace.findAll({
    //attributes: ['id', 'titleName'],
    where: {
      id: {
        [db.Sequelize.Op.ne]: 1
      }
    },
    order: [['id', 'DESC']]
  })
  console.log(JSON.stringify(VenueSpaceData, null, 4));
  res.render('venuespace/view', { title: '諮商系統 空間設定' })
})

router.get('/', async (req, res, next) => {
  const VenueSpaceData = await db.VenueSpace.findAll({})
  res.status(200).send(JSON.stringify(VenueSpaceData));
})

router.post('/', async (req, res, next) => {})
router.put('/', async (req, res, next) => {})
router.delete('/', async (req, res, next) => {})

module.exports = router