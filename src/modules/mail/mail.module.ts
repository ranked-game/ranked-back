// Core
import { Module } from '@nestjs/common';

// Services
import { EmailService } from './services';

@Module({
  imports: [],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class MailModule {}
