const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Authorization token is required' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next(); 
    } catch (error) {
        console.error('Error authenticating user:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};


const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); 
    } else {
        res.status(403).json({ message: 'Forbidden' }); 
    }
};




const isNormalUser = (req, res, next) => {
    if (req.user && !req.user.isAdmin) {
        next(); 
    } else {
        res.status(403).json({ message: 'Forbidden' }); 
    }
};

module.exports = { isNormalUser,authenticate ,isAdmin};


