'use strict'

const express = require('express')
const router = express.Router()
const co = require('co')
const modelComment = require('../models/comments')

/* GET comment get */
router.get('/:id',
  function(req, res) {
    co(function * () {
      const comment = yield modelComment.get.bind(null, req.params.id)
      res.json({
        success: true,
        result: comment
      })
    })
  }
)

/* DELETE comment delete */
router.delete('/:id',
  function(req, res) {
    co(function * () {
      const updated = +new Date()
      yield modelComment.delete.bind(null, req.params.id, res.locals.user.uid, updated)
      res.json({
        success: true
      })
    })
  }
)
