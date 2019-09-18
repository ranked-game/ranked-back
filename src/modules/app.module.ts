// Core
import { Module } from '@nestjs/common';

// Modules
import { AuthorizationModule } from './';

@Module({
  imports: [AuthorizationModule],
})
export class AppModule {}
