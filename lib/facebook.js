'use strict'

const FacebookStrategy = require('passport-facebook').Strategy
const passport = require('passport')
const modelUser = require('../models/user')
const co = require('co')
const config = require('../config')

passport.use(new FacebookStrategy({
  clientID: config.facebook.appId,
  clientSecret: config.facebook.appSecret,
  callbackURL: 'http://' + config.aws.ec2 + ':3003/auth/facebook/callback'
},
  function (accessToken, refreshToken, profile, cb) {
    co(function * () {
      var uid = profile.id
      var user = yield modelUser.read.bind(null, uid)
      if (user.length) {
        return cb(null, user[0])
      }
      var date = getTime()
      user = {
        uid: uid,
        name: profile.displayName.trim(),
        ctime: date,
        utime: date
      }
      yield modelUser.create.bind(null, user)
      return cb(null, user)
    }).catch(cb)
  }
))

passport.initialize()
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})
