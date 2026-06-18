import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
  partId: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
  quantity: { type: Number, required: true, min: 1 },
}, { _id: false });

const cycleSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  description: { type: String, trim: true },
  components: [componentSchema],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Cycle = mongoose.model('Cycle', cycleSchema);