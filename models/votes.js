'use strict'
const db = require('../lib/query')

const Vote = function (user) {
}

Vote.prototype.create = function (vote, cb) {
  if (!vote.ctime) {
    vote.utime = vote.ctime = getTime()
  }
  db.query('INSERT INTO votes(comment_id,user_id,ctime,utime) VALUES($comment_id,$user_id,$ctime,$utime)', vote, function (err, rows) {
    cb(err, rows)
  })
}

Vote.prototype.delete = function (vote, cb) {
  vote.utime = vote.ctime = getTime()
  db.query('DELETE from votes WHERE user_id = $user_id AND comment_id = $comment_id', vote, function (err, rows) {
    cb(err, rows)
  })
}

module.exports = new Vote()
