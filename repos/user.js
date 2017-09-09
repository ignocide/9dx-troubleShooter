'use strict'
const db = require('../lib/mysql')

const User = function (user) {
}

User.prototype.create = function (user, cb) {
  if (!user.ctime) {
    user.utime = user.ctime = new Date()
  }
  db.query('INSERT INTO users(uid,name,utime,ctime) VALUES($uid,$name,$utime,$ctime)', user, function (err, rows) {
    cb(err, rows)
  })
}

User.prototype.read = function (uid, cb) {
  db.query('SELECT * FROM users WHERE uid = $uid and deleted = 0', {uid: uid}, function (err, rows) {
    cb(err, rows)
  })
}

module.exports = new User()
