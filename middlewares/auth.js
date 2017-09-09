
module.exports = {
  requireLogin: function (req, res, next) {
    if (req.isAuthorization()) {
      return next()
    }
    return res.status(401).json({
      success: false
    })
  }
}
