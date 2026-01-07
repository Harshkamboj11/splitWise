//modules
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

//other files
import route from './src/interface/http/auth.route.js';
import verifyUser from './src/interface/middleware/auth.middleware.js';
import passport from 'passport';
import './src/infrastructure/security/google.passport.js';

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

//routes
app.use('/api', route)
app.use('/api/auth', route)

export default app;