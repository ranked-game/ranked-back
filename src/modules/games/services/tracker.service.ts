// Core
import { Injectable } from '@nestjs/common';

// Dto
import { StartGameDto } from '../dto';

// Services
import { RedisStorageService, UnitOfWorkService } from '../../dbl';

@Injectable()
export class TrackerService {
  constructor(
    private readonly redis: RedisStorageService,
    private readonly dbUnit: UnitOfWorkService,
  ) {}

  public async startGame(gameData: StartGameDto, accountId: string) {
    const game = { date: Date.now(), ...gameData };

    await this.redis.hset('game', accountId, JSON.stringify(game));

    return true;
  }
}
