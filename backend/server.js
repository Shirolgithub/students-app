const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

// Load environment variables first
dotenv.config();

// Debug: confirm environment variable is being loaded
console.log('📦 Loaded Mongo URI:', process.env.MONGO_URI);

// Check if Mongo URI is missing
if (!process.env.MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI not found in .env file');
  process.exit(1);
}

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('✅ Student Registration Backend is Live and Connected to MongoDB!');
});

// Routes
app.use('/api/students', studentRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
