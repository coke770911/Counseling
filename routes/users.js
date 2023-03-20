const express = require('express')
const router = express.Router()
const db = require('../models')

/* GET users listing. */
router.get('/', function (req, res, next) {
  // db.Users.hasMany

  db.Users.findAll({}).then(data => {
    console.log(JSON.stringify(data, null, 2))
  })

  db.UserAuth.findAll({}).then(data => {
    console.log(JSON.stringify(data, null, 2))
  })

  res.send('respond with a resource')
})

module.exports = router
