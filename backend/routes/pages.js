const express = require('express');
const router = express.Router();

// Home Page
router.get('/', (req, res) => res.render('layout', {
  partialPath: 'index',
  activePage: 'home',
  title: 'Evan Patterson - Home'
}));

// About Page
router.get('/about', (req, res) => res.render('layout', {
  partialPath: 'about',
  activePage: 'about',
  title: 'About Me'
}));

// Projects Page
router.get('/projects', (req, res) => res.render('layout', {
  partialPath: 'projects',
  activePage: 'projects',
  title: 'My Projects'
}));

// Games Page
router.get('/games', (req, res) => res.render('layout', {
  partialPath: 'games',
  activePage: 'games',
  title: 'Games Collection'
}));

// Music Page
router.get('/music', (req, res) => res.render('layout', {
  partialPath: 'music',
  activePage: 'music',
  title: 'My Music'
}));

// Blog Page
router.get('/blog', (req, res) => res.render('layout', {
  partialPath: 'blog',
  activePage: 'blog',
  title: 'Blog'
}));

// Contact Page
router.get('/contact', (req, res) => res.render('layout', {
  partialPath: 'contact',
  activePage: 'contact',
  title: 'Contact Me'
}));

module.exports = router;
