import bcrypt from 'bcryptjs';
import 'dotenv/config';

//It will encrypt the password
const encryptPass = async (password) => {
  const salt_round = Number(process.env.SALT_ROUNDS) || 10;
  const hashPass = await bcrypt.hash(password, salt_round);

  return hashPass;
};

const decryptPass = async (pass, hashPass) => {
  const compare = await bcrypt.compare(pass, hashPass);

  if (compare) return true;

  return false;
};

export { encryptPass, decryptPass };
