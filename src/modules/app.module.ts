// Core
import { Module } from '@nestjs/common';

// Modules
import { AuthorizationModule } from './';
import { ContactModule } from './contact';
import { GamesModule } from './games';
import { ChallengesModule } from './challenges';

@Module({
  imports: [AuthorizationModule, ContactModule, GamesModule, ChallengesModule],
})
export class AppModule {}
