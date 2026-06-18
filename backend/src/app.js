import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/ping', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// A simple welcome route
app.get('/', (req, res) => {
  res.send('🚲 Hero Cycles Pricing Engine API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/ping`);
});