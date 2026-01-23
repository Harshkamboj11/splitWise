import express from 'express';
import passport from 'passport';

const router = express.Router();

import { handleLogin, handleSignUp, checkUser } from './auth.controller.js';
import generateToken from '../../infrastructure/security/token.provider.js';
import verifyUser from '../middleware/auth.middleware.js';

router.post('/user/signup', handleSignUp);
router.post('/user/login', handleLogin);
router.get('/user/me', verifyUser, checkUser);

router.get(
  '/user/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/',
  }),
  async (req, res) => {
    const user = req.user;

    console.log(user)
    const token = await generateToken({
      userId: user.id,
      email: user.email,
    });

    console.log('heyy lodu , this is me ', token)
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });

    res.redirect('http://localhost:8080');
  }
);

export default router;
