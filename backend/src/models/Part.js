import mongoose from 'mongoose';

const priceHistorySchema = new mongoose.Schema({
  price: { type: Number, required: true, min: 0 },
  changedAt: { type: Date, default: Date.now },
  reason: { type: String, default: 'update' },
}, { _id: false });

const partSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  category: {
    type: String,
    required: true,
    enum: ['frame', 'tyre', 'gear', 'seat', 'brake', 'handle', 'chain', 'pedal'],
  },
  currentPrice: { type: Number, required: true, min: 0 },
  priceHistory: [priceHistorySchema],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

partSchema.pre('save', function(next) {
  if (this.isNew) {
    this.priceHistory.push({ price: this.currentPrice, reason: 'initial' });
  } else if (this.isModified('currentPrice')) {
    this.priceHistory.push({ price: this.currentPrice, reason: 'manual_update' });
  }
  next();
});

export const Part = mongoose.model('Part', partSchema);