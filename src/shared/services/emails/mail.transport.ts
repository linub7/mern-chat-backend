import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { config } from '@root/config';
import { BadRequestError } from '@global/helpers/errorHandler';

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

class MailTransport {
  public async sendEmail(receiverEmail: string, subject: string, body: string): Promise<void> {
    this.developmentEmailSender(receiverEmail, subject, body);
  }

  private async developmentEmailSender(receiverEmail: string, subject: string, body: string): Promise<void> {
    const transporter: Mail = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.SENDER_EMAIL!,
        pass: config.SENDER_EMAIL_PASSWORD!
      }
    });

    const mailOptions: IMailOptions = {
      from: `Chatty <${config.SENDER_EMAIL}>`,
      to: receiverEmail,
      subject,
      html: body
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.log('Error sending email', error);
      throw new BadRequestError('Error sending email.');
    }
  }
}

export const mailTransport: MailTransport = new MailTransport();
