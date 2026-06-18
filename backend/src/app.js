import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import partRoutes from './routes/partRoutes.js';
import cycleRoutes from './routes/cycleRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting the server
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/ping', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.get('/', (req, res) => {
  res.send('🚲 Hero Cycles Pricing Engine API');
});

app.use('/api/parts', partRoutes);
app.use('/api/cycles', cycleRoutes); 
app.use('/api/quotes', quoteRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});