// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticate = require('../middleware/authMiddleware');

router.get('/profile', authenticate, profileController.getProfile);
router.get('/:userId', authMiddleware.authenticate, profileController.getProfileDetails);

router.put('/profile/update', authenticate, profileController.updateProfile);
router.put('/profile/privacy', authenticate, profileController.updatePrivacy);
router.post('/upload-photo', profileController.uploadPhoto);


module.exports = router;
