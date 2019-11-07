// Core
import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';

// Controllers
import { AccountsController } from './accounts.controller';

// Modules
import { DblModule } from '../dbl/dbl.module';
import { AccountsService } from './services';

// Middlewares
import { AuthMiddleware } from '../auth';

@Module({
  providers: [AccountsService],
  imports: [DblModule],
  exports: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'account', method: RequestMethod.ALL });
  }
}
