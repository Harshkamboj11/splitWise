import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [to],
      subject: subject,
      html: html,
    });

    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }
    
  } catch (error) {
    console.log(error);
  }
};

const sendOTP = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [to],
      subject: subject,
      html: html,
    });

    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }
    
  } catch (error) {
    console.log(error);
  }
};

export {sendEmail, sendOTP};
