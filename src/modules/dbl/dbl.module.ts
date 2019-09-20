// Core
import { Module, Logger } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';

// ORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

// Module
import { UnitOfWorkService, RedisStorageService } from './services';
import { AccountEntity } from './models';

// Configs
import { ormConfig, redisConfig } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature([AccountEntity]),
    RedisModule.register(redisConfig),
  ],
  controllers: [],
  providers: [UnitOfWorkService, RedisStorageService],
  exports: [UnitOfWorkService, RedisStorageService],
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
