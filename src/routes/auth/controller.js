import { encode } from 'auth';
import { sendMagicLink, verifyMagicLink } from './service';

export const register = async (req, res) => {
  const { email } = req.body;
  await sendMagicLink(email);
  res.sendStatus(200);
};

export const login = async (req, res) => {
  const { token } = req.query;
  const user = await verifyMagicLink(token);
  const accessToken = await encode({ email: user.email, userId: user.id });
  res.json({ email: user.email, accessToken });
};