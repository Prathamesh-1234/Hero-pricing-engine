import { Part } from '../models/Part.js';

export const createPart = async (req, res) => {
  try {
    const part = await Part.create(req.body);
    res.status(201).json(part);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePartPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPrice, reason } = req.body;
    const part = await Part.findById(id);
    if (!part) return res.status(404).json({ error: 'Part not found' });

    part.currentPrice = currentPrice;
    if (reason) {
      part.priceHistory.push({ price: currentPrice, reason });
    }
    await part.save();
    res.json(part);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getParts = async (req, res) => {
  try {
    const { active } = req.query;
    const filter = active === 'true' ? { isActive: true } : {};
    const parts = await Part.find(filter).sort({ name: 1 });
    res.json(parts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};