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

const allowed = ['https://izhantaskmanager.netlify.app'];
const corsOptions = {
  origin: (origin, callback) => {
    // Allow same-origin requests (e.g. mobile, localhost, Postman)
    if (!origin || allowed.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all


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
