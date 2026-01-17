//modules imports
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

//other imports
import addUsers from './src/interface/http/ledger.route.js';

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);

app.use('/api/user', addUsers);
app.get('/', (req, res) => {
  res.json('helllo');
  console.log('hii u are at homepage');
});

export default app;
