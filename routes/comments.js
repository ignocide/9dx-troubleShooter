'use strict'

const express = require('express')
const router = express.Router()
const co = require('co')
const modelComment = require('../models/comments')
const modelVote = require('../models/votes')
const mdAuth = require('../middlewares/auth')

var errorRes = function (res) {
  return function (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

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
    .catch(errorRes(res))
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
    .catch(errorRes(res))
  }
)

router.route('/:comment_id/vote')
  .post(
    mdAuth.requireLogin,
    function (req, res, next) {
      co(function * () {
        var uid = res.locals.user.uid
        var vote = {
          user_id: uid,
          comment_id: req.params.comment_id
        }
        yield modelVote.create.bind(null, vote)

        res.json({
          success: true
        })
      })
      .catch(errorRes(res))
    }
)

router.route('/:comment_id/vote/:vote_id')
  .delete(
    mdAuth.requireLogin,
    function (req, res, next) {
      co(function * () {
        var uid = res.locals.user.uid
        var vote = {
          user_id: uid,
          vote_id: req.params.vote_id
        }
        yield modelVote.delete.bind(null, vote)

        res.json({
          success: true
        })
      })
      .catch(errorRes(res))
    }
)

module.exports = router
