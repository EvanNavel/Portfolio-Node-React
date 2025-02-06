// routes/pages.js

const express = require('express');
const router = express.Router();
const { 
  fetchRecentlyPlayedGames,
  fetchMasteredGames
} = require('../services/games');
const sendEmail = require('../services/emailService');


const BlogPost = require('../models/BlogPost');

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
  title: 'NaveEvan - Home'
}));

// About Page
router.get('/about', (req, res) => res.render('layout', {
  partialPath: 'about',
  activePage: 'about',
  title: 'NaveEvan - About Me'
}));

// Projects Page
router.get('/projects', (req, res) => res.render('layout', {
  partialPath: 'projects',
  activePage: 'projects',
  title: 'NaveEvan - My Projects'
}));

// Games Page
router.get('/games', async (req, res) => {
  try {
    const [recent, mastered] = await Promise.all([
      fetchRecentlyPlayedGames(authorization, {username: 'NavelEvan'}),
      fetchMasteredGames(authorization, {username: 'NavelEvan', sortBy: 'lastPlayed'})
    ]);
    res.render('layout', {
      partialPath: 'games',
      activePage: 'games',
      title: 'NaveEvan - RetroAchievements',
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
  title: 'NaveEvan - Music'
}));

// Blog Page
router.get('/blog', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort({ createdAt: -1 });
    res.render('layout', {
      partialPath: 'blog',
      activePage: 'blog',
      title: 'NaveEvan - Blog',
      blogPosts: blogPosts
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('layout', {
      partialPath: 'error',
      error: 'Failed to load blog posts'
    });
  }
});

// Contact Page
router.get('/contact', (req, res) => res.render('layout', {
  partialPath: 'contact',
  activePage: 'contact',
  title: 'NaveEvan - Contact Me'
}));

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await sendEmail(name, email, message);
    res.status(200).render('layout', {
      partialPath: 'contact',
      activePage: 'contact',
      title: 'Contact Me',
      responseMessage: 'Your message has been sent successfully!',
    });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).render('layout', {
      partialPath: 'contact',
      activePage: 'contact',
      title: 'Contact Me',
      responseMessage: 'There was an error sending your message. Please try again later.',
    });
  }
});


module.exports = router;