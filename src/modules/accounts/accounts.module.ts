// Core
import { Module } from '@nestjs/common';

// Controllers
import { AccountsController } from './accounts.controller';

// Modules
import { DblModule } from '../dbl/dbl.module';
import { AccountsService } from './services';

@Module({
  providers: [AccountsService],
  imports: [DblModule],
  exports: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
