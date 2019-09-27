// Core
import { Module } from '@nestjs/common';

// Modules
import { AuthorizationModule } from './';
import { MailModule } from './mail';

@Module({
  imports: [AuthorizationModule, MailModule],
})
export class AppModule {}
