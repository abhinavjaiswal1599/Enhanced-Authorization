const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./config/passport'); // Import passport configuration
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const db = require('./config/db');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(bodyParser.json());
app.use(fileUpload());

// Initialize Passport middleware
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
