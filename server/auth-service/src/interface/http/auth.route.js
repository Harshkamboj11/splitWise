import express from 'express';
const router = express.Router();

import {handleLogin, handleSignUp} from './auth.controller.js';

router.post('/user/create-new-user', handleSignUp);
router.post('/user/login', handleLogin);

export default router;
