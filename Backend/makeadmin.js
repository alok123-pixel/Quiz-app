// makeAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    const result = await User.findOneAndUpdate(
      { email: 'lmn@email.com' }, 
      { role: 'admin' },
      { new: true }
    );

    if (result) {
      console.log('✅ User updated to admin:', result);
    } else {
      console.log('❌ User not found');
    }

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ Error:', err);
  });
