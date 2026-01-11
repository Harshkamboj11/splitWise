import axios from 'axios';
import 'dotenv/config';

const sendConfirmationEmail = async ({ email, name }) => {
  try {
    await axios.post(
      `${process.env.NOTIFICATION_BASE_URL}`,
      {
        event: 'USER_SIGNUP',
        to: email,
        data: {
          name,
        },
      },
      {
        timeout: 5000,
      }
    );
  } catch (error) {
    console.error('Notification failed: ', error.message);
  }
};

export default sendConfirmationEmail;
