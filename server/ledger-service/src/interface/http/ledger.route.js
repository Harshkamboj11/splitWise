import express from 'express';
const router = express.Router();

import {
  addAmount,
  splitAmount,
  addParticipant,
  getParticipants,
} from './ledger.controller.js';
import verifyUser from '../middleware/auth.middleware.js';

router.post('/add-users', verifyUser, addParticipant);
router.post('/add-amount', verifyUser, addAmount);
router.get('/split-amount/:participantName', verifyUser, splitAmount);
router.get('/participants', verifyUser, getParticipants);

export default router;
