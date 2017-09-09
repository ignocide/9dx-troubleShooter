
module.exports = {
  requireLogin: function (req, res, next) {
    if (req.isAuthorization()) {
      return next()
    }
    return res.json({
      success: false
    })
  }
}
