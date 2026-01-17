import express from 'express';
const router = express.Router();

import { sendNotification } from "./resend.controller.js";

router.post('/send-mail', sendNotification)

export default router