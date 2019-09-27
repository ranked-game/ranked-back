// Core
import { Injectable, Logger } from '@nestjs/common';

// Utils
import * as nodemailer from 'nodemailer';
import { readFile } from 'fs';
import { promisify } from 'util';
import * as path from 'path';
import handlebars from 'handlebars';

// Config
import { mailSesTransportConfig } from '../config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter = nodemailer.createTransport(
    mailSesTransportConfig,
  );

  public async sendPromotionalEmail(receiver: string) {
    const template = await this.compileEmailTemplate('mvpSubscriptionEmail');

    const mailOptions = {
      from: 'Ranked Game <mvp@ranked.game>',
      to: receiver,
      subject: 'Ranked Subscription',
      html: template,
    };

    this.transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        this.logger.error(err);
      } else {
        this.logger.log(info);
      }
    });
  }

  private async compileEmailTemplate(type: string) {
    const readFileAsync = promisify(readFile);

    const html = await readFileAsync(
      path.join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'public',
        'mvpSubscriptionEmail.html',
      ),
      { encoding: 'utf-8' },
    );

    const template = handlebars.compile(html);

    return template({});
  }
}
