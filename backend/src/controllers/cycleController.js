import { Cycle } from '../models/Cycle.js';
import { Part } from '../models/Part.js';
import { calculateCyclePrice } from '../services/pricingService.js';

export const createCycle = async (req, res) => {
  try {
    const { name, description, components, isActive } = req.body;

    const partIds = components.map(c => c.partId);
    const existingParts = await Part.find({ _id: { $in: partIds }, isActive: true });
    if (existingParts.length !== partIds.length) {
      return res.status(400).json({ error: 'One or more parts are invalid or inactive' });
    }

    const uniqueIds = new Set(partIds.map(id => id.toString()));
    if (uniqueIds.size !== partIds.length) {
      return res.status(400).json({ error: 'Duplicate parts are not allowed in a cycle' });
    }

    const cycle = await Cycle.create({
      name,
      description,
      components,
      isActive: isActive !== undefined ? isActive : true,
    });

    await cycle.populate('components.partId');
    res.status(201).json(cycle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCycles = async (req, res) => {
  try {
    const { active } = req.query;
    const filter = active === 'true' ? { isActive: true } : {};
    const cycles = await Cycle.find(filter)
      .populate('components.partId')
      .sort({ createdAt: -1 });
    res.json(cycles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCyclePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const breakdown = await calculateCyclePrice(id);
    res.json(breakdown);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};