import mongoose from 'mongoose';

const quoteItemSchema = new mongoose.Schema({
  partId: { type: mongoose.Schema.Types.ObjectId, ref: 'Part' },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  subtotal: { type: Number, required: true, min: 0 },
}, { _id: false });

const quoteSchema = new mongoose.Schema({
  cycleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cycle', required: true },
  customerName: { type: String, required: true, trim: true },
  items: [quoteItemSchema],
  totalPrice: { type: Number, required: true, min: 0 },
}, { timestamps: true });

export const Quote = mongoose.model('Quote', quoteSchema);