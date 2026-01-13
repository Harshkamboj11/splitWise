import express from 'express';
const router = express.Router();

import { addAmount, splitAmount, addParticipant} from './ledger.controller.js';
import verifyUser from '../middleware/auth.middleware.js'

router.post('/add-users',verifyUser, addParticipant);
router.post('/add-amount',verifyUser, addAmount);
router.get('/split-amount/:participantName',verifyUser, splitAmount);

export default router;
