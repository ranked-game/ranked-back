// Core
import { Module } from '@nestjs/common';

// Modules
import { AuthorizationModule, DblModule } from './';

@Module({
  imports: [AuthorizationModule, DblModule],
})
export class AppModule {}
