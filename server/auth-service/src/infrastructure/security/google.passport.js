import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import pool from '../database/db.connection.js';
import 'dotenv/config';
import generatePassword from 'password-generator';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const password = generatePassword(12, false);
        console.log(password);

        console.log(email);
        console.log(name);
        const result = await pool.query(
          `SELECT * FROM auth.users WHERE email = $1 `,
          [email]
        );

        let user = result.rows[0];

        if (!user) {
          const insert = await pool.query(
            `INSERT INTO auth.users (name, email, password)
          VALUES ($1, $2, $3)
          RETURNING *`,
            [name, email, password]
          );
          user = insert.rows[0];
        }

        console.log(user);
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
