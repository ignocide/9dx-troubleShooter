'use strict'

const FacebookStrategy = require('passport-facebook').Strategy
const passport = require('passport')
const repoUser = require('../repos/user')
const co = require('co')
const config = require('../config')

passport.use(new FacebookStrategy({
  clientID: config.facebook.appId,
  clientSecret: config.facebook.appSecret,
  callbackURL: 'http://' + config.aws.ec2 + ':3000/auth/facebook/callback'
},
  function (accessToken, refreshToken, profile, cb) {
    co(function * () {
      var uid = profile.id
      var user = yield repoUser.read.bind(null, uid)
      if (user.length) {
        return cb(null, user[0])
      }
      var date = +new Date()
      user = {
        uid: uid,
        name: profile.displayName.trim(),
        ctime: date,
        utime: date
      }
      yield repoUser.create.bind(null, user)
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
