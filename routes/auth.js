'use strict'

const express = require('express')
const router = express.Router()

const passport = require('passport')
const serviceToken = require('../services/token')

/* GET posts list */
router.get('/facebook',
  passport.authenticate('facebook'))

/* POST posts create */
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/facebook/fail' }),
  function (req, res) {
    // Successful authentication, redirect home.
    var token = serviceToken.generate(req.user)
    res.json({
      success: true,
      result: {
        token: token
      }
    })
  })

/* POST posts create */
router.get('/facebook/failure',
  function (req, res) {
    // Successful authentication, redirect home.
    res.json({
      success: false
    })
  })

// // dumy
// router.get('/test', function (req, res) {
//   var user = { uid: '1385393824907130',
//     name: 'SungMin  Kim',
//     ctime: 1504944344121,
//     utime: 1504944344121 }
//   repoUser.create(user, function () {
//     console.log(arguments)
//   })
// })

module.exports = router
