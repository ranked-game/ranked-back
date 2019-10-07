// Core
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

// Modules
import { DblModule } from '../dbl';

// Controllers
import { GamesController } from './games.controller';

// Services
import { TrackerService } from './services';
import { AuthMiddleware } from '../auth';

@Module({
  imports: [DblModule],
  controllers: [GamesController],
  providers: [TrackerService],
})
export class GamesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'games', method: RequestMethod.ALL });
  }
}
