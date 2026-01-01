import pool from '../../infrastructure/database/db.connection.js';
import {
  encryptPass,
  decryptPass,
} from '../../infrastructure/security/password.hasher.js';
import generateToken from '../../infrastructure/security/token.provider.js';

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

    const hashPass = await encryptPass(password);

    const user = await pool.query(
      `INSERT INTO auth.users (name, email, password)
          VALUES ($1, $2, $3)
          RETURNING *`,
      [name, email, hashPass]
    );

    res.status(201).json({
      success: true,
      message: 'User create successfully',
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
      `SELECT email, password from auth.users where email = $1`,
      [email]
    );
    console.log('User logged in successfully', user);

    if (user.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not Found, Please signup again',
      });
    }

    //token generation
    const payload = user.id;
    const token = await generateToken({ payload });

    //token storing in cookies
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log('Token stored in cookie');
    const comparePass = await decryptPass(password, user.rows[0].password);
    if (user.rows[0].email === email && comparePass) {
      return res.status(201).json({
        success: true,
        message: 'Login successfull',
        token: token,
      });
    }

    return res.status(422).json({
      success: false,
      message: 'Fill all the credientials carefully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in handling login',
      error: error.message,
    });
  }
};


export { handleSignUp, handleLogin };
