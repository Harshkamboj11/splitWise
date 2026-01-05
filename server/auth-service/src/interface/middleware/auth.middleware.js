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

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.id,
      email: decoded.email
    };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};

export default verifyUser;
