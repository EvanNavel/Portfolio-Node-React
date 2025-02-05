// index.js
require('dotenv').config({ path: '../.env' });
const express = require('express');
const path = require('path');
const app = express();

const pagesRouter = require('./routes/pages');
const retroAchievementsRouter = require('./routes/retroachievements'); // ← Should be router instance

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/retroachievements', retroAchievementsRouter); // ← Now using valid router

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Page Router
app.use('/', pagesRouter);

// Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));