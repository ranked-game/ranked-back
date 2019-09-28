// Core
import { Module } from '@nestjs/common';

// Modules
import { AuthorizationModule } from './';
import { ContactModule } from './contact';

@Module({
  imports: [AuthorizationModule, ContactModule],
})
export class AppModule {}
