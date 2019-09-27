// Core
import { Module } from '@nestjs/common';

// Modules
import { MailModule } from '../mail';
import { DblModule } from '../dbl';

// Controllers
import { ContactController } from './contact.controller';

@Module({
  imports: [MailModule, DblModule],
  controllers: [ContactController],
})
export class ContactModule {}
