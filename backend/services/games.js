require('dotenv').config();
const { 
  getUserRecentlyPlayedGames,
  getUserCompletionProgress
} = require('@retroachievements/api');

const username = process.env.RA_USERNAME;
const webApiKey = process.env.RA_API_KEY;

// For Currently Playing Games
async function fetchRecentlyPlayedGames(authorization, params) {
  try {
    // const params = {
    //   username: 'NavelEvan'
    // };

    const response = await getUserRecentlyPlayedGames(authorization, params);
    return response?.filter(g => g != {}) || [];
  } catch (error) {
    console.error('Current games error:', error.message);
    throw error;
  }
}

// For Mastered Games
async function fetchMasteredGames(authorization, params) {
  try {
//    const params = {
//       username: 'NavelEvan',
//       sortBy: 'lastPlayed'
//     };

    const response = await getUserCompletionProgress(authorization, params);
    return response?.results?.filter(g => g.highestAwardKind == 'mastered') || [];
  } catch (error) {
    console.error('Mastered games error:', error.message);
    throw error;
  }
}

module.exports = {
  fetchRecentlyPlayedGames,
  fetchMasteredGames
};
