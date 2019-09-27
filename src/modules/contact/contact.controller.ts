// Core
import { Controller, Post, Req, Get, Body } from '@nestjs/common';

// Services
import { EmailService } from '../mail';

// Dto
import { SubscribeMvpDto } from './dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly emailService: EmailService) {}

  @Post('mvp/subscribe')
  async subscribeMvp(@Body() subscriber: SubscribeMvpDto) {
    const { email } = subscriber;

    await this.emailService.sendPromotionalEmail(email);

    return { success: true };
  }
}
