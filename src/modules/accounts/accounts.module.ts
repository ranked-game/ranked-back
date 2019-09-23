// Core
import { Module } from '@nestjs/common';

// Modules
import { DblModule } from '../dbl/dbl.module';
import { AccountsService } from './services';

@Module({
  providers: [AccountsService],
  imports: [DblModule],
  exports: [AccountsService],
})
export class AccountsModule {}
