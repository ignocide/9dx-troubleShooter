'use strict'
const db = require('../lib/query')

const Post = function (post) {
}

var normalize = function (post) {
  post.user = {
    uid: post.uid,
    name: post.name
  }
  delete post.uid,
  delete post.name
  return post
}

Post.prototype.create = function (post, cb) {
  db.query('INSERT INTO posts(title, content, user_id, created, updated) VALUES($title, $content, $user_id, $created, $updated)', post, function (err, rows) {
    cb(err, rows)
  })
}

Post.prototype.list = function (cb) {
  db.query('SELECT p.*, u.uid,u.name FROM posts p join users u on p.user_id = u.uid WHERE p.deleted=0 and u.deleted = 0', function (err, rows) {
    if (err) {
      return cb(err)
    }
    for (let post of rows) {
      post = normalize(post)
    }

    return cb(null, rows)
  })
}

Post.prototype.get = function (post_id, cb) {
  db.query('SELECT p.*, u.uid,u.name FROM posts p join users u on p.user_id = u.uid WHERE p.id = $post_id AND p.deleted=0 and u.deleted = 0', {post_id: post_id}, function (err, rows) {
    if (err) {
      cb(err)
    }
    if (!rows.length) {
      cb(new Error('no post'))
    }
    console.log(rows)
    var post = normalize(rows[0])
    cb(null, post)
  })
}

Post.prototype.delete = function (post_id, user_id, updated, cb) {
  db.query('UPDATE posts SET deleted=1, updated=$updated WHERE id=$post_id AND user_id=$user_id', {post_id: post_id, user_id: user_id, updated: updated}, function (err, rows) {
    cb(err, rows)
  })
}

Post.prototype.update = function (post_id, user_id, post, cb) {
  post.post_id = post_id
  post.user_id = user_id
  db.query('UPDATE posts SET title=$title, content=$content, updated=$updated WHERE id=$post_id AND user_id=$user_id', post, function (err, rows) {
    cb(err, rows)
  })
}

module.exports = new Post()
