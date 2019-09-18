// Core
import { Module } from '@nestjs/common';

// Modules
import { AccountsModule } from '../accounts/accounts.module';
import { AuthorizationController } from './auth.controller';
import { GoogleAuthService, DiscordAuthService } from './services';

@Module({
  controllers: [AuthorizationController],
  providers: [GoogleAuthService, DiscordAuthService],
  imports: [AccountsModule],
})
export class AuthorizationModule {}
