import jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token;

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'unauthorized',
      });
    }

    console.log(token)
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};

export default verifyUser;
