import nodemailer from 'nodemailer';
import { emailPassword, emailService, emailUser } from 'configs';

const transport = nodemailer.createTransport({
  service: emailService,
  auth: {
    user: emailUser,
    pass: emailPassword
  },
});

export const sendEmail = async (to, subject, body) => {
  let message = { from: `${emailUser} TODOs App`, to, subject, text: body };
  return await transport.sendMail(message);
};