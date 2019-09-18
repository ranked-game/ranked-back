// Core
import { Module, Logger } from '@nestjs/common';

// ORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

// Module
import { UnitOfWorkService } from './services/UnitOfWorkService';
import { AccountEntity } from './models';

// Configs
import { ormConfig } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature([AccountEntity]),
  ],
  controllers: [],
  providers: [UnitOfWorkService],
  exports: [UnitOfWorkService],
})
export class DblModule {
  private readonly logger = new Logger(DblModule.name);

  constructor(private readonly connection: Connection) {
    this.runMigrations();
  }
  async runMigrations() {
    try {
      await this.connection.runMigrations();
    } catch (error) {
      this.logger.error('Failed to run migrations', error);
    }
  }
}
