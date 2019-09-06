import { Module } from '@nestjs/common';

import { AuthorizationController } from './auth.controller';
import { GoogleAuthService, DiscordAuthService } from './services';

@Module({
  controllers: [AuthorizationController],
  providers: [GoogleAuthService, DiscordAuthService],
  imports: [],
})
export class AuthorizationModule {}
