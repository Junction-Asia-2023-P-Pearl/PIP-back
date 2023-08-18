import * as bcrypt from 'bcrypt';

const crypt_round = ((24 * 26 * 2023 * 7 * 3) % 10) + 10;

export const crypt = (inp: string) => {
  return bcrypt.hash(inp, crypt_round);
};

export const compareCrypt = (inp: string, hash: string) => {
  return bcrypt.compare(inp, hash);
};
