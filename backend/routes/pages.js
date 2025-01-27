const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('layout', {
  partialPath: 'index',
  activePage: 'home',
  title: 'Evan Patterson - Home'
}));

router.get('/about', (req, res) => res.render('layout', {
  partialPath: 'about',
  activePage: 'about',
  title: 'About Me'
}));

// Add similar routes for other pages (projects, games, etc.)
// Pattern:
/*
router.get('/PATH', (req, res) => res.render('layout', {
  partialPath: 'TEMPLATE_NAME',
  activePage: 'ACTIVE_PAGE_NAME',
  title: 'PAGE_TITLE'
}));
*/

module.exports = router;