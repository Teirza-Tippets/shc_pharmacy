const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.render('student/dashboard');
});

router.get('/profile', (req, res) => {
  res.render('student/profile');
});

module.exports = router;
