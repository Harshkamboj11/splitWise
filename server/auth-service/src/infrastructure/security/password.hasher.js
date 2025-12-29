import bcrypt from 'bcryptjs';

//It will encrypt the password
const encryptPass = async (password) => {
  const salt_round = 12;
  const hashPass = await bcrypt.hash(password, salt_round);

  return hashPass;
};

module.exports = encryptPass;