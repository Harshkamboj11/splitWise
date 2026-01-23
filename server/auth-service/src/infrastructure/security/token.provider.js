import jwt from 'jsonwebtoken';
import 'dotenv/config';

const generateToken = async (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '168h', //7 days
    });
    
    // console.log(token);
    return token;
  } catch (error) {
    console.log('error in generating token', error);
  }
};

export default generateToken;