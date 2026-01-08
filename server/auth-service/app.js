//modules
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

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
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

//routes
app.use('/api', route);
app.use('/api/auth', route);

export default app;
