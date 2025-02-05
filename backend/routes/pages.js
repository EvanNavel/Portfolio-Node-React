const express = require('express');
const router = express.Router();
const { 
  fetchRecentlyPlayedGames,
  fetchMasteredGames
} = require('../services/games');

const { 
  buildAuthorization
} = require('@retroachievements/api');

const username = process.env.RA_USERNAME;
const webApiKey = process.env.RA_API_KEY;
const authorization = buildAuthorization({ username, webApiKey });

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
router.get('/games', async (req, res) => {
  try {
    const [recent, mastered] = await Promise.all([
      fetchRecentlyPlayedGames(authorization, {username: 'NavelEvan'}),
      fetchMasteredGames(authorization, {username: 'NavelEvan', sortBy: 'lastPlayed'})
    ]);
    console.log(recent)
    console.log(mastered)


    res.render('layout', {
      partialPath: 'games',
      activePage: 'games',
      title: 'Gaming Achievements',
      recentlyPlayedGames: recent,
      masteredGames: mastered
    });
  } catch (error) {
    console.error('Games page error:', error);
    res.render('layout', {
      partialPath: 'games',
      activePage: 'games',
      title: 'Gaming Achievements',
      error: 'Failed to load game data',
      recentlyPlayedGames: [],
      masteredGames: []
    });
  }
});

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