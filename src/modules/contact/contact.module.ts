// Core
import { Module } from '@nestjs/common';

// Modules
import { MailModule } from '../mail';

@Module({
  imports: [MailModule],
})
export class ContactModule {}
