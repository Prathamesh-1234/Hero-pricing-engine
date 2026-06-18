import express from 'express';
import { createCycle, getCycles, getCyclePrice } from '../controllers/cycleController.js';

const router = express.Router();

router.post('/', createCycle);
router.get('/', getCycles);
router.get('/:id/price', getCyclePrice);   // ← new endpoint

export default router;