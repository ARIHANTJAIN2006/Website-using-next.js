import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '../models/usermodels.js';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESETPASSWORD') {
      await User.findByIdAndUpdate(userId, {
        forgotpasswordToken: hashedToken,
        forgotpasswordTokenexpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: emailType === 'VERIFY' ? 'VERIFY YOUR EMAIL' : 'RESET YOUR PASSWORD',
      html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyemail' : 'verifypasstoken'}?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: unknown) {
  if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error("Unknown error occurred");
  }
}

};
