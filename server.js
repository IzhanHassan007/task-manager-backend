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
const allowedOrigins = ['http://localhost:5173', 'https://izhantaskmanager.netlify.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json()); // To parse JSON in requests

// 🔹 ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 🔹 DEFAULT ROUTE (TEST)
app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

// 🔹 PORT & DB CONFIG
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

//  SUPER IMPORTANT: SERVER ALWAYS STARTS!
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 🔹 DATABASE CONNECTION (AFTER SERVER START)
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected Successfully!');
})
.catch((error) => {
  console.error('MongoDB connection error:', error.message);
});
