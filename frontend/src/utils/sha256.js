import { createHmac } from 'crypto';

const { SECRET_KEY } = process.env;

const sha256 = (password) =>
  createHmac('sha256', SECRET_KEY).update(password).digest('hex');

export { sha256 };
