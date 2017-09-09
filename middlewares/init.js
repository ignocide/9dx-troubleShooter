'use strict'
const co = require('co')

const facebookAuth = require('../lib/facebook')
const serviceToken = require('../services/token')

module.exports = function (req, res, next) {
  co(function *() {
    // check login
    req.isAuthorization = function () {
      if (res.locals.user) {
        return true
      } else {
        return false
      }
    }
    if (req.header('authorization')) {
      res.locals.user = serviceToken.retieve(req.header('authorization'))
    }
    next()
  })
  .catch(function (err) {
    next(err)
  })
}
