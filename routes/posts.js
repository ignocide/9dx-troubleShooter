var express = require('express');
var router = express.Router();

/* GET posts list */
router.get('/', function(req, res, next) {
  res.send('response with a resource');
});

/* POST posts create */
router.post('/', function(req, res, next) {
  var published_date = new Date(req.body.published_date);
  var post = {
    title: req.body.title,
    content: req.body.content,
    created: published_date,
    update: published_date,
  };
  var query = connetions

});

/* GET post */
router.get('/:id', function(req, res, next) {
  res.send('response with a resource');
});

/* DELETE post */
router.delete('/:id', function(req, res, next) {

});

module.exports = router;
