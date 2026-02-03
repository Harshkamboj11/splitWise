import pool from '../../infrastructure/database/db.connection.js';
import {
  encryptPass,
  decryptPass,
} from '../../infrastructure/security/password.hasher.js';
import generateToken from '../../infrastructure/security/token.provider.js';
import sendConfirmationEmail from '../../utils/notification.client.js';

//Handle the signup
const handleSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'name is required',
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'email is required',
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        error: 'password is required',
      });
    }

    // if (password.length() < 8) {
    //   return res.status(400).json({
    //     success: false,
    //     error: 'Password must be of atleast 8 characters',
    //   });
    // }

    const userExist = await pool.query(
      `SELECT * FROM auth.users WHERE email = $1`,
      [email]
    );

    if (userExist.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashPass = await encryptPass(password);

    const user = await pool.query(
      `INSERT INTO auth.users (name, email, password)
          VALUES ($1, $2, $3)
          RETURNING *`,
      [name, email, hashPass]
    );

    // console.log(user);

    // console.log('Started sending email');
    // console.log(user.rows[0].name);
    // console.log(user.rows[0].email);

    sendConfirmationEmail({
      email: user.rows[0].email,
      name: user.rows[0].name,
    });

    const userId = user.rows[0].id;
    const payload = { userId, email };
    const token = await generateToken(payload);
    
    //token storing in cookies
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });

    // console.log('email sent');
    res.status(201).json({
      success: true,
      message: 'User signUp Successfully',
      user: user.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: 'error in handling signup',
    });
  }
};

//Handle the login
const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).json({
      success: false,
      error: 'email is required',
    });
  }

  if (!password) {
    res.status(400).json({
      success: false,
      error: 'password is required',
    });
  }

  try {
    const user = await pool.query(
      `SELECT id, email, password from auth.users where email = $1`,
      [email]
    );
    // console.log('User logged in successfully', user);

    if (user.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not Found, Please signup again',
      });
    }

    //token generation
    const userId = user.rows[0].id;
    const payload = { userId, email };
    const token = await generateToken(payload);

    //token storing in cookies
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });

    console.log('Token stored in cookie');
    const comparePass = await decryptPass(password, user.rows[0].password);
    if (user.rows[0].email === email && comparePass) {
      return res.status(200).json({
        success: true,
        message: 'Login successfull',
        token: token,
      });
    }

    return res.status(422).json({
      success: false,
      message: 'Fill all the credientials carefully',
      user: user.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in handling login',
      error: error.message,
    });
  }
};

const checkUser = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: 'user not logged in',
      });
    }

    const id = req.user.userId;
    // console.log('USER ID:', id);

    const user = await pool.query(`SELECT * FROM auth.users WHERE id = $1`, [
      id,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'user not exist',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'user found',
      user: user.rows[0],
    });
  } catch (error) {
    // console.error('CHECK USER ERROR:', error);

    return res.status(500).json({
      success: false,
      message: 'something went wrong in authenticating user',
      error: error.message,
    });
  }
};

export { handleSignUp, handleLogin, checkUser };
