module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg','Please login to access your restaurant list.')
    res.redirect('/users/login')
  }
}