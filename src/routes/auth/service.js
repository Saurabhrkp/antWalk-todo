import { port } from 'configs';
import { query } from 'services/database';
import { sendEmail } from 'services/email';
import { v4 as uuidv4 } from 'uuid';

export const generateMagicLink = async (email) => {
  const token = uuidv4();
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 15); // 15 minutes expiry

  const result = await query(
    `UPDATE todosapp.users SET magic_link_token = $1, token_expiry = $2 WHERE email = $3 RETURNING *`,
    [token, expiry, email]
  );

  return result.rows[0];
};

export const sendMagicLink = async (email) => {
  const user = await query(`SELECT * FROM todosapp.users WHERE email = $1`, [email]);
  if (!user.rows.length) {
    await query(`INSERT INTO todosapp.users (email) VALUES ($1)`, [email]);
  }

  const { magic_link_token } = await generateMagicLink(email);
  const magicLinkUrl = `http://localhost:${port}/auth/magic-link?token=${magic_link_token}`;

  const subject = 'Magic Link to TODOs App - (Link Valid for 15 Minutes Only)';
  const body = `Use the below link for ${magicLinkUrl} to log in.`;

  await sendEmail(email, subject, body);
};

export const verifyMagicLink = async (token) => {
  const res = await query(
    `SELECT * FROM todosapp.users WHERE magic_link_token = $1 AND token_expiry > NOW()`,
    [token]
  );

  if (!res.rows.length) {
    throw new Error('Invalid or expired token');
  }

  const user = res.rows[0];
  await query(
    `UPDATE todosapp.users SET magic_link_token = NULL, token_expiry = NULL WHERE id = $1`,
    [user.id]
  );

  return user;
};