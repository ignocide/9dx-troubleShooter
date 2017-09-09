'use strict'
const db = require('../lib/query')

const Comment = function (comment) {

}

Comment.prototype.create = function (comment, cb) {
  if (!comment.created) {
    comment.updated = comment.created = getTime()
  }
  db.query('INSERT INTO comments(content, created, updated, post_id, user_id) VALUES($content, $created, $updated, $post_id, $user_id)', comment, function (err, rows) {
    cb(err, rows)
  })
}

Comment.prototype.list = function (post_id, cb) {
  db.query('SELECT co.* ,count(votes.comment_id) as count FROM comments as co left outer join votes on co.id = votes.comment_id and votes.deleted = 0 WHERE co.deleted=0 and co.post_id = $post_id group by votes.id', {post_id, post_id}, function (err, rows) {
    cb(err, rows)
  })
}

Comment.prototype.get = function (comment_id, cb) {
  db.query('SELECT * FROM comments WHERE id=$comment_id AND deleted=0', {comment_id: comment_id}, function (err, rows) {
    cb(err, rows)
  })
}

Comment.prototype.delete = function (comment_id, user_id, updated, cb) {
  db.query('UPDATE comments SET deleted=1, updated=$updated WHERE id=$comment_id AND user_id=$user_id', {comment_id: comment_id, user_id: user_id, updated: updated}, function (err, rows) {
    cb(err, rows)
  })
}

Comment.prototype.update = function (comment_id, user_id, comment, cb) {
  if (!comment.updated) {
    comment.updated = getTime()
  }
  comment.comment_id = comment_id
  comment.user_id = user_id
  db.query('UPDATE comments SET content=$content, updated=$updated WHERE id=$comment_id AND user_id=$user_id', comment, function (err, rows) {
    cb(err, rows)
  })
}

module.exports = new Comment()
