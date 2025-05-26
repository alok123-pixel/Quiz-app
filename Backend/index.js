import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import User from './models/User.js'; // ✅ FIXED - add this line

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the quiz app');
});

// ✅ Admin-maker route
app.get('/make-me-admin/:email', async (req, res) => {
  try {
    const result = await User.findOneAndUpdate(
      { email: req.params.email },
      { role: 'admin' },
      { new: true }
    );

    if (result) return res.send('✅ Admin made: ' + result.email);
    else return res.status(404).send('❌ User not found');
  } catch (err) {
    res.status(500).send('❌ Error: ' + err.message);
  }
});

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
