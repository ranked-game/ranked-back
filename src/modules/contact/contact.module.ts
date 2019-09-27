// Core
import { Module } from '@nestjs/common';

// Modules
import { MailModule } from '../mail';

// Controllers
import { ContactController } from './contact.controller';

@Module({
  imports: [MailModule],
  controllers: [ContactController],
})
export class ContactModule {}
