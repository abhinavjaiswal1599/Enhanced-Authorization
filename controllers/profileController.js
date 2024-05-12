
const User = require('../models/User');

const fs = require('fs');
const path = require('path');



const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (user.isPublic || req.user.isAdmin) {
            return res.status(200).json(user);
        } else {
            return res.status(403).json({ message: 'Access denied' });
        }
    } catch (error) {
        console.error('Error getting profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const User = require('../models/User');

const getProfileDetails = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).select('-password'); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error retrieving profile details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, bio, phone, email, password, isPublic } = req.body;
        if (!name || !bio || !phone || !email || !password || isPublic === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { name, bio, phone, email, password, isPublic }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const updatePrivacy = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { isPublic } = req.body;
        // Validate input
        if (isPublic === undefined) {
            return res.status(400).json({ message: 'Privacy setting is required' });
        }
        const updatedUser = await User.findByIdAndUpdate(userId, { isPublic }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating privacy setting:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const uploadPhoto = async (req, res) => {
    try {
        if (!req.files || !req.files.photo) {
            return res.status(400).json({ message: 'No photo uploaded' });
        }

        const photo = req.files.photo;

        if (!photo.mimetype.startsWith('image')) {
            return res.status(400).json({ message: 'Only image files are allowed' });
        }

        if (photo.size > 5 * 1024 * 1024) {
            return res.status(400).json({ message: 'File size exceeds the limit' });
        }

        const fileName = `${Date.now()}_${photo.name}`;

        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, fileName);
        await photo.mv(filePath);

        const userId = req.user.id; // Assuming user ID is available in req.user
        const user = await User.findByIdAndUpdate(userId, { photo: filePath }, { new: true });

        res.status(200).json({ message: 'Photo uploaded successfully', user });
    } catch (error) {
        console.error('Error uploading photo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = { getProfile, updateProfile, updatePrivacy ,uploadPhoto,getProfileDetails};
