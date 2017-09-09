var express = require('express');
var router = express.Router();
var post = require('../models/posts');

/* GET post or posts */
router.get('/:id', function(req, res, next) {
  if(req.params.id) {
    post.getPostById(req.params.id, function(err, rows) {
      if(err) {
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });
  }
  else {
    post.getAllPosts(function(err, rows) {
      if(err) {
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });
  }
});


/* CREATE post */
router.post('/', function(req, res, next) {
  let data = {

  };
  post.addPost(data, function(err, count) {
    if(err) {
      res.json(err)
    }
    else {
      res.json(data)
    }
  });
});

/* DELETE post */
router.delete('/:id', function(req, res, next) {
  post.deletePost(req.params.id, function(err, count) {
    if(err) {
      res.json(err);
    }
    else {
      res.json(count);
    }
  });
});

/* PUT post */
router.put('/:id', function(req, res, next) {
  post.updatePost(req.params.id, function(err, rows) {
    if(err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
