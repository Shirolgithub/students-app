const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      /\.onrender\.com$/,   // allow ANY Render frontend domain
    ],
    credentials: true,
  })
);

// Default home route
app.get('/', (req, res) => {
  res.send('✅ Student Registration Backend is Live and Connected to MongoDB!');
});

// API routes
app.use('/api/students', studentRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
