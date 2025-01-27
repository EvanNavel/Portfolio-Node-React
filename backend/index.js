const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const pagesRouter = require('./routes/pages');
app.use('/', pagesRouter);

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));