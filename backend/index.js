// index.js

require('dotenv').config({ path: '../.env' });
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const pagesRouter = require('./routes/pages');
const retroAchievementsRouter = require('./routes/retroachievements');
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/yourdb';


// MongoDB Connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/retroachievements', retroAchievementsRouter);

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Page Router
app.use('/', pagesRouter);

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('layout', {
    partialPath: 'partials/error',
    message: 'An unexpected error occurred'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
