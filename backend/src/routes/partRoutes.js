import express from 'express';
import { createPart, updatePartPrice, getParts } from '../controllers/partController.js';

const router = express.Router();

router.post('/', createPart);
router.put('/:id/price', updatePartPrice);
router.get('/', getParts);

export default router;