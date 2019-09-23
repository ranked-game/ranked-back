// Core
import { Module } from '@nestjs/common';

// Modules
import { AccountsModule } from '../accounts/accounts.module';
import { AuthorizationController } from './auth.controller';
import {
  GoogleAuthService,
  DiscordAuthService,
  TokensService,
} from './services';
import { DblModule } from '../dbl';

@Module({
  controllers: [AuthorizationController],
  providers: [GoogleAuthService, DiscordAuthService, TokensService],
  imports: [AccountsModule, DblModule],
})
export class AuthorizationModule {}
