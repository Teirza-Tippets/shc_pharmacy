const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('account/login'); // Render login page
});

// Local login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.flash('error', info.message); // Store error message
      return res.redirect('/account/login'); // Redirect back to login
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/student/dashboard');
    });
  })(req, res, next);
});


router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
