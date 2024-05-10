// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticate = require('../middleware/authMiddleware');

router.get('/profile', authenticate, profileController.getProfile);
router.put('/profile', authenticate, profileController.updateProfile);
router.put('/profile/privacy', authenticate, profileController.updatePrivacy);

module.exports = router;
