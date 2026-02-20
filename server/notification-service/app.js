import express from 'express'

const app = express()

app.use(express.json());

import router from './src/resend/resend.route.js';

app.use('/api', router);

export default app;