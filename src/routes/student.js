const express = require('express');
const router = express.Router();

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/account/login'); // Redirect to login if not authenticated
}

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('student/dashboard');
});

router.get('/profile', isAuthenticated, (req, res) => {
  res.render('student/profile');
});

module.exports = router;
