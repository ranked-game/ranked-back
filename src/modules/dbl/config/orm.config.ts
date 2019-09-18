import { dbConfig } from '.';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  host: dbConfig.host,
  type: 'postgres',
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: ['dist/**/*.entity{.ts,.js}', __dirname + '../**/*.entity{.ts}'],
  migrations: ['dist/src/dbl/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/dbl/migrations',
  },
  synchronize: true,
  logging: true,
};
