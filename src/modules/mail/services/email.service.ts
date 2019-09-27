// Core
import { Injectable, Logger } from '@nestjs/common';

// Utils
import * as nodemailer from 'nodemailer';

// Config
import { mailSesTransportConfig } from '../config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter = nodemailer.createTransport(
    mailSesTransportConfig,
  );

  public async sendPromotionalEmail(receiver: string) {
    const mailOptions = {
      from: 'Ranked Game <noreply@ranked.game>',
      to: receiver,
      subject: 'Ranked Subscription',
    };

    if (process.env.NODE_ENV === 'prod') {
      this.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          this.logger.error(err);
        } else {
          this.logger.log(info);
        }
      });
    }
  }
}
