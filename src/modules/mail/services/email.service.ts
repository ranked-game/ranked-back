// Core
import { Injectable } from '@nestjs/common';

// Utils
import * as nodemailer from 'nodemailer';

// Config
import { mailTransportConfig } from '../config';

@Injectable()
export class EmailService {
  private readonly transporter = nodemailer.createTransport(
    mailTransportConfig,
  );

  public async sendPromotionalEmail(recipient) {}
}
