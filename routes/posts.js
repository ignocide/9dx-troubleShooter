'use strict'

const express = require('express');
const router = express.Router();
const co = require('co')
const modelPost = require('../models/posts')

/* GET posts list */
router.get('/',
  function(req, res) {
    co(function * () {
      const posts = yield modelPost.list.bind(null)
      res.json({
        success: true,
        result: posts
      })
    })
})

/* GET post get */
router.get('/:id',
  function(req, res) {
    co(function * () {
      const post = yield modelPost.get.bind(null, req.params.id)
      res.json({
        success: true,
        result: post
      })
    })
  }
)

/* POST post create */
router.post('/',
  function(req, res) {
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
        succes: true,
        result: post
      })
    })
  }
)

/* DELETE post delete */
router.delete('/:id',
  function(req, res) {
    co(function * () {
      const date = +new Date()
      yield modelPost.delete.bind(null, req.params.id, res.locals.user.uid, date)
      res.json({
        success: true
      })
    })
  }
)

/* UPDATE post update */
router.update('/:id',
  function(req, res) {
    co(function * () {
      req.body.updated = +new Date()
      yield modelPost.update.bind(null, req.params.id, res.locals.user.uid, req.body)
      res.json({
        success: true
      })
    })
  }
)

module.exports = router;
