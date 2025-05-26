import jwt from 'jsonwebtoken';
import  User  from '../models/User.js';

export const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ msg: 'User not found' });

    req.user = user; 
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Admin only' });
  }
  next();
};

