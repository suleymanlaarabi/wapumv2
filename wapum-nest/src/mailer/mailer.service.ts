import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Resend } from 'resend';

export type EmailData = {
  recipients: string[];
  subject: string;
  body: string;
};

const from = 'wapum.service <onboarding@resend.dev>';

@Injectable()
export class MailerService {
  private readonly mailer: Resend;
  constructor() {
    this.mailer = new Resend(process.env.RESEND_API_KEY);
  }

  private async sendEmail(data: EmailData) {
    try {
      console.log('Sending email to:', data.recipients);
      const response = await this.mailer.emails.send({
        from,
        to: data.recipients,
        subject: data.subject,
        html: data.body,
      });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async sendCreatedAccountEmail(user: User) {
    const data: EmailData = {
      recipients: [user.email],
      subject: 'Welcome to Wapum!',
      body: `Hello ${user.username},<br><br>
      Your account has been created successfully.<br><br>
      Thank you for choosing Wapum!`,
    };
    return await this.sendEmail(data);
  }

  async sendResetPasswordEmail(user: User, token: string) {
    const data: EmailData = {
      recipients: [user.email],
      subject: 'Reset your password',
      body: `Hello ${user.username},<br><br>
      You requested to reset your password.<br><br>
      Click <a href="${process.env.FRONTEND_URL}/reset-password/${token}">here</a> to reset your password.<br><br>
      If you did not request this, please ignore this email.`,
    };
    return await this.sendEmail(data);
  }
}
