import { Cycle } from '../models/Cycle.js';
import { Part } from '../models/Part.js';

/**
 * Calculate the price breakdown for a given cycle ID.
 * @param {string} cycleId - The ID of the cycle configuration.
 * @returns {Promise<{ items: Array, total: number }>}
 * @throws {Error} if cycle not found or any part is inactive/missing.
 */
export const calculateCyclePrice = async (cycleId) => {
  // 1. Fetch the cycle and populate its component part details
  const cycle = await Cycle.findById(cycleId).populate('components.partId');
  if (!cycle) {
    throw new Error('Cycle not found');
  }

  // 2. Build the breakdown
  const items = [];
  let total = 0;

  for (const comp of cycle.components) {
    const part = comp.partId;
    if (!part) {
      throw new Error(`Component with partId ${comp.partId} not found`);
    }
    if (!part.isActive) {
      throw new Error(`Part "${part.name}" is inactive`);
    }
    const subtotal = part.currentPrice * comp.quantity;
    items.push({
      partId: part._id,
      name: part.name,
      category: part.category,
      quantity: comp.quantity,
      unitPrice: part.currentPrice,
      subtotal: subtotal,
    });
    total += subtotal;
  }

  return { items, total };
};