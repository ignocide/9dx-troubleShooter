'use strict'
const db = require('../lib/query')

const Vote = function (user) {
}

Vote.prototype.create = function (vote, cb) {
  if (!user.ctime) {
    vote.utime = vote.ctime = getTime()
  }
  db.query('INSERT INTO votes(comment_id,user_id) VALUES($comment_id,$user_id)', vote, function (err, rows) {
    cb(err, rows)
  })
}

module.exports = new Vote()
