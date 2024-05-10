
const User = require('../models/User');


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

module.exports = { getProfile, updateProfile, updatePrivacy };
