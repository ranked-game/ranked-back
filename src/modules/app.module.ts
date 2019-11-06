// Core
import { Module } from '@nestjs/common';

// Modules
import { AuthorizationModule } from './';
import { ContactModule } from './contact';
import { GamesModule } from './games';

@Module({
  imports: [AuthorizationModule, ContactModule, GamesModule],
})
export class AppModule {}
