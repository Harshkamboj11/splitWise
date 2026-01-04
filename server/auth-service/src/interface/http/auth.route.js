import express from 'express';
import passport from 'passport';
import generateToken from '../../infrastructure/security/token.provider.js';

const router = express.Router();

import { handleLogin, handleSignUp } from './auth.controller.js';

router.post('/user/signup', handleSignUp);
router.post('/user/login', handleLogin);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);


router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/',
  }),
  (req, res) => {
    const user = req.user;

    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });

    res.redirect('');
  }
);

export default router;
