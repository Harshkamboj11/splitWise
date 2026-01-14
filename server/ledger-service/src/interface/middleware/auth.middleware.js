import jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token;

  try {
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'unauthorized',
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // console.log(decoded.email);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or Expired token',
      error: error.message,
    });
  }
};

export default verifyUser;
