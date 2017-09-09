'use strict'

const express = require('express')
const router = express.Router()
const co = require('co')
const modelPost = require('../models/posts')
const modelComment = require('../models/comments')

var errorRes = function (res) {
  return function (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

/* GET posts list */
router.route('/')
.get(
  function (req, res) {
    co(function * () {
      const posts = yield modelPost.list.bind(null)
      if (!posts.length) {
        throw new Error('no post')
      }
      res.json({
        success: true,
        result: posts[0]
      })
    })
    .catch(errorRes(res))
  }
)
// write post
.post(
  function (req, res) {
    co(function * () {
      const date = getTime()
      let post = {
        title: req.body.title,
        content: req.body.content,
        user_id: res.locals.user.uid,
        created: date,
        updated: date
      }
      yield modelPost.create.bind(null, post)
      res.json({
        succes: true
      })
    })
    .catch(errorRes(res))
  }
)

/* GET post get */
router.route('/:post_id')
.get(
  function (req, res) {
    co(function * () {
      const post = yield modelPost.get.bind(null, req.params.post_id)
      const comments = yield modelComment.list.bind(null, req.params.post_id)
      post.comments = comments
      res.json({
        success: true,
        result: {
          post: post
        }
      })
    })
    .catch(errorRes(res))
  }
)
.put(
  function (req, res) {
    co(function * () {
      req.body.updated = getTime()
      yield modelPost.update.bind(null, req.params.post_id, res.locals.user.uid, req.body)
      res.json({
        success: true
      })
    })
    .catch(errorRes(res))
  }
)
.delete(
  function (req, res) {
    co(function * () {
      const date = getTime()
      yield modelPost.delete.bind(null, req.params.post_id, res.locals.user.uid, date)
      res.json({
        success: true
      })
    })
    .catch(errorRes(res))
  }
)

/* GET comments list */
router.route('/:post_id/comments')
.get(
  function (req, res) {
    co(function * () {
      const comments = yield modelComment.list.bind(null, req.params.post_id)
      res.json({
        success: true,
        result: comments
      })
    })
    .catch(errorRes(res))
  }
)
.post(
  function (req, res) {
    co(function * () {
      let comment = {
        content: req.body.content,
        user_id: res.locals.user.uid,
        post_id: req.params.post_id
      }
      yield modelComment.create.bind(null, comment)
      res.json({
        succes: true
      })
    })
    .catch(errorRes(res))
  }
)

module.exports = router
