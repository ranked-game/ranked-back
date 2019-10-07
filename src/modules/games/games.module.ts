// Core
import { Module } from '@nestjs/common';

// Modules
import { DblModule } from '../dbl';

// Controllers
import { GamesController } from './games.controller';

// Services
import { TrackerService } from './services';

@Module({
  imports: [DblModule],
  controllers: [GamesController],
  providers: [TrackerService],
})
export class GamesModule {}
