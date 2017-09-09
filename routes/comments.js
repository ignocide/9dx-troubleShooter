'use strict'

const express = require('express')
const router = express.Router()
const co = require('co')
const modelComment = require('../models/comments')

/* GET comment get */
router.get('/:comment_id',
  function (req, res) {
    co(function * () {
      const comment = yield modelComment.get.bind(null, req.params.comment_id)
      res.json({
        success: true,
        result: comment
      })
    })
  }
)

/* DELETE comment delete */
router.delete('/:comment_id',
  function (req, res) {
    co(function * () {
      const updated = getTime()
      yield modelComment.delete.bind(null, req.params.comment_id, res.locals.user.uid, updated)
      res.json({
        success: true
      })
    })
  }
)

//
// router.route('/comment/:comment_id/vote')
//   .get(function () {
//
//   })
//

router.route('/comment/:comment_id/vote')
  .post(function (req, res, next) {
    co(function * () {
      yield
    })
  }
)

module.exports = router
