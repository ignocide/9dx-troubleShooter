'use strict'

const express = require('express')
const router = express.Router()

const passport = require('passport')
const serviceToken = require('../services/token')
const modelUser = require('../models/user')

const co = require('co')
const FB = require('fb')
/* GET posts list */
router.post('/facebook',
  function (req, res, next) {
    co(function * () {
      var uid = req.body.id

      var profile = yield getProfile.bind(null, req.body.accessToken)
      var user = yield modelUser.read.bind(null, uid)
      if (user.length) {
        res.locals.user = user
        return next()
      }
      var date = getTime()
      user = {
        uid: uid,
        name: profile.name,
        ctime: date,
        utime: date
      }
      yield modelUser.create.bind(null, user)
      res.locals.user = user
      return next()
    }).catch(function (err) {
      res.status(500).json({
        success: false,
        error: err
      })
    })
  },
  function (req, res) {
    var token = serviceToken.generate(res.locals.user)
    res.json({
      success: true,
      token: token
    })
  }
)

var getProfile = function (accessToken, callback) {
  FB.options({accessToken: accessToken})

  FB.api('/me', function (res) {
    if (res && res.error) {
      if (res.error) {
        return callback(res.error)
      }
    } else {
      return callback(null, res)
    }
  })
}
module.exports = router
