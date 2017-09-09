'use strict'

const express = require('express')
const router = express.Router()
const co = require('co')
const modelPost = require('../models/posts')
const modelComment = require('../models/comments')

var errorRes = function (res) {
  return function (err) {
    res.json({
      success: false,
      message: err
    })
  }
}

/* GET posts list */
router.get('/',
  function (req, res) {
    co(function * () {
      const posts = yield modelPost.list.bind(null)
      res.json({
        success: true,
        result: posts
      })
    })
    .catch(errorRes(res))
  })

/* GET post get */
router.get('/:id',
  function (req, res) {
    co(function * () {
      const post = yield modelPost.get.bind(null, req.params.id)
      const comments = yield modelComment.list.bind(null, req.params.id)
      res.json({
        success: true,
        result: {
          post: post,
          comments: comments
        }
      })
    })
    .catch(errorRes(res))
  }
)

/* POST post create */
router.post('/',
  function (req, res) {
    co(function * () {
      const date = +new Date()
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
  })

/* DELETE post delete */
router.delete('/:id',
  function (req, res) {
    co(function * () {
      const date = +new Date()
      yield modelPost.delete.bind(null, req.params.id, res.locals.user.uid, date)
      res.json({
        success: true
      })
    })
    .catch(errorRes(res))
  }
)

/* UPDATE post update */
router.put('/:id',
  function (req, res) {
    co(function * () {
      req.body.updated = +new Date()
      yield modelPost.update.bind(null, req.params.id, res.locals.user.uid, req.body)
      res.json({
        success: true
      })
    })
    .catch(errorRes(res))
  }
)

/* GET comments list */
router.get('/:id/comments',
  function (req, res) {
    co(function * () {
      const comments = yield modelComment.list.bind(null, id)
      res.json({
        success: true,
        result: comments
      })
    })
    .catch(errorRes(res))
  }
)

/* POST comment create */
router.post('/:id/comments',
  function (req, res) {
    co(function * () {
      const date = +new Date()
      let comment = {
        content: req.body.content,
        user_id: res.locals.user.uid,
        post_id: req.params.id,
        created: date,
        updated: date
      }
      yield modelComment.create.bind(null, comment)
      res.json({
        succes: true
      })
    })
    .catch(function (err) {
      res.json({
        success: false
      })
    })
    .catch(errorRes(res))
  })

module.exports = router
