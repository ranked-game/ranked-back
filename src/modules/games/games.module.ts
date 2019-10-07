// Core
import { Module } from '@nestjs/common';

// Modules
import { DblModule } from '../dbl';

// Controllers
import { GamesController } from './games.controller';

@Module({
  imports: [DblModule],
  controllers: [GamesController],
})
export class GamesModule {}
