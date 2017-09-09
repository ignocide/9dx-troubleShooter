'user strict'
const db = require('../lib/query');

const Post = function (post) {
}

Post.prototype.create = function(post, cb) {
  db.query('INSERT INTO posts(title, content, user_id, created, updated) VALUES($title, $content, $user_id, $created, $updated)', post, function(err, rows) {
    cb(err, rows)
  })
}

Post.prototype.list = function(cb) {
  db.query('SELECT * FROM posts WHERE deleted=0', function(err, rows) {
    cb(err, rows)
  })
}

Post.prototype.get = function(post_id, cb) {
  db.query('SELECT * FROM posts WHERE id=$post_id AND deleted=0', {post_id: post_id}, function(err, rows) {
    cb(err, rows)
  })
}

Post.prototype.delete = function(post_id, user_id, updated, cb) {
  db.query('UPDATE posts SET deleted=1, updated=$updated WHERE id=$post_id AND user_id=$user_id', {post_id: post_id, user_id: user_id, updated: updated}, function(err, rows) {
    cb(err, rows)
  })
}

Post.prototype.update = function(post_id, user_id, post, cb) {
  post.post_id = post_id
  post.user_id = user_id
  db.query('UPDATE posts SET title=$title, content=$content, updated=$updated WHERE id=$post_id AND user_id=$user_id', post, function(err, rows) {
    cb(err, rows)
  })
}

module.exports = new Post()
