import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Part } from '../models/Part.js';
import { Cycle } from '../models/Cycle.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🗄️ Connected to MongoDB for seeding');

    // Clear existing data (optional – comment out if you want to keep)
    await Part.deleteMany({});
    await Cycle.deleteMany({});
    console.log('🧹 Cleared existing parts and cycles');

    // Sample parts
    const partsData = [
      { name: 'Aluminium Frame', category: 'frame', currentPrice: 4500 },
      { name: 'Mountain Tyre', category: 'tyre', currentPrice: 650 },
      { name: 'Road Tyre', category: 'tyre', currentPrice: 850 },
      { name: 'Shimano 21-Speed', category: 'gear', currentPrice: 2500 },
      { name: 'Comfort Seat', category: 'seat', currentPrice: 800 },
      { name: 'Disc Brake Set', category: 'brake', currentPrice: 1800 },
      { name: 'Flat Handlebar', category: 'handle', currentPrice: 600 },
      { name: 'Standard Chain', category: 'chain', currentPrice: 400 },
      { name: 'Flat Pedals', category: 'pedal', currentPrice: 350 },
    ];
    
    const parts = await Part.insertMany(partsData);
    const cycle = await Cycle.create({
    name: 'Hero Mountain Pro',
    description: 'Standard mountain bike configuration',
    components: [
      { partId: parts[0]._id, quantity: 1 }, // frame (index 0)
      { partId: parts[1]._id, quantity: 2 }, // tyres (index 1)
      { partId: parts[3]._id, quantity: 1 }, // gear (index 3)
      { partId: parts[4]._id, quantity: 1 }, // seat (index 4)
      { partId: parts[5]._id, quantity: 1 }, // brakes (index 5)
      { partId: parts[6]._id, quantity: 1 }, // handle (index 6)
      ],
    });
    console.log(`✅ Created cycle: ${cycle.name}`);
    console.log(`✅ Inserted ${parts.length} parts`);

    console.log('🌱 Seeding complete');
    process.exit(0);

  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seed();