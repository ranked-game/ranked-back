// Core
import { Module } from '@nestjs/common';

// Modules
import { DblModule } from '../dbl';

@Module({
  controllers: [],
  providers: [],
  imports: [DblModule],
})
export class ChallengesModule {}
