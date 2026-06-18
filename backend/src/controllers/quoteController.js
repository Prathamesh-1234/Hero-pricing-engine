import { Quote } from '../models/Quote.js';
import { calculateCyclePrice } from '../services/pricingService.js';

export const createQuote = async (req, res) => {
  try {
    const { cycleId, customerName } = req.body;

    if (!cycleId || !customerName) {
      return res.status(400).json({ error: 'cycleId and customerName are required' });
    }

    // Get current pricing breakdown (snapshot)
    const { items, total } = await calculateCyclePrice(cycleId);

    // Prepare quote items (snapshot)
    const quoteItems = items.map(item => ({
      partId: item.partId,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.subtotal,
    }));

    // Create the quote
    const quote = await Quote.create({
      cycleId,
      customerName,
      items: quoteItems,
      totalPrice: total,
    });

    // Populate cycle details for response
    await quote.populate('cycleId', 'name description');

    res.status(201).json(quote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find()
      .populate('cycleId', 'name description')
      .sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};