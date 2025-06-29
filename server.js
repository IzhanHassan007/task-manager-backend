// 🔹 IMPORTS
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

// 🔹 ENV SETUP
dotenv.config();
const app = express();

// 🔹 MIDDLEWARE
app.use(cors());
app.use(express.json()); // To parse JSON in requests
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 🔹 TEST ROUTE
app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

// 🔹 DATABASE CONNECTION
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected Successfully !!! ');
  // 🔹 START SERVER
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error !!:', error.message);
});
