const express = require('express');
const router = express.Router();

router.get('/faqs', (req, res) => {
    res.render('info/faqs', { layout: 'layout' });
});
  
  router.get('/howtofill', (req, res) => {
    res.render('info/howtofill', { layout: 'layout' });
  });
  
  router.get('/insurance', (req, res) => {
    res.render('info/insurance', { layout: 'layout' });
  });
  
  router.get('/welcome', (req, res) => {
    res.render('info/welcome', { layout: 'layout' });
  });
  

module.exports = router;

