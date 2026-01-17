import otpTemplate from '../templates/otp.js';
import welcomeUser from '../templates/welcome.js';
import {sendEmail, sendOTP} from './resend.logic.js';

const sendNotification = async (req, res) => {
  const { event, to, data } = req.body;

  console.log(data);
  if (event === 'USER_SIGNUP') {
    await sendEmail(
      to,
      'Welcome to SplitWise 🎉',
      welcomeUser({ name: data.name })
    );
  }

  if (event === 'OTP_SEND') {
    await sendOTP(
      to,
      'Get back to your account',
      otpTemplate({name: data.name, otp: data.otp})
    )
  }

  res.json({ success: true });
};

export { sendNotification };
