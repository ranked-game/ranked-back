// Core
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

// Utils
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: false,
      debug: true,
      playground: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
