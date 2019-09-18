// Core
import { Module } from '@nestjs/common';

// Modules
import { DblModule } from '../dbl/dbl.module';
import { AuthorizationController } from './auth.controller';
import { GoogleAuthService, DiscordAuthService } from './services';

@Module({
  controllers: [AuthorizationController],
  providers: [GoogleAuthService, DiscordAuthService],
  imports: [DblModule],
})
export class AuthorizationModule {}
