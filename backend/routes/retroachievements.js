// routes/retroachievements.js
const express = require('express');
const router = express.Router();
const { fetchRecentlyPlayedGames, fetchMasteredGames } = require('../services/games');

const { 
  buildAuthorization
} = require('@retroachievements/api');

const username = process.env.RA_USERNAME;
const webApiKey = process.env.RA_API_KEY;
const authorization = buildAuthorization({ username, webApiKey });

// Proper route definitions
router.get('/current-games/:username', async (req, res) => {
  try {
    const games = await fetchRecentlyPlayedGames(authorization, {
      username: 'NavelEvan',
      count: 10
    });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/mastered-games/:username', async (req, res) => {
  try {
    const games = await fetchMasteredGames(authorization, {
      username: 'NavelEvan',
      count: 10
    });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; // ← Must export the router directly