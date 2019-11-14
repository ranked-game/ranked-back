// Core
import { Injectable, Logger } from '@nestjs/common';

// Dto
import { StartGameDto, EndGameDto } from '../dto';

// Services
import { RedisStorageService, UnitOfWorkService, GameEntity } from '../../dbl';

// Utils
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';

@Injectable()
export class TrackerService {
  private readonly logger = new Logger(TrackerService.name);
  private readonly gamesRepository: Repository<GameEntity>;

  constructor(
    private readonly redis: RedisStorageService,
    private readonly dbUnit: UnitOfWorkService,
  ) {
    this.gamesRepository = dbUnit.getGamesRepository();
  }

  public async startGame(gameData: StartGameDto, accountId: string) {
    const game = { date: Date.now(), ...gameData };

    await this.redis.hset('game', accountId, JSON.stringify(game));

    return true;
  }

  public async history(accountId: string) {
    const games = await this.gamesRepository.find({ where: { accountId } });

    return games;
  }

  public async gameDuration(gameData: EndGameDto, accountId: string) {
    const data = await this.redis.hget('game', accountId);
    if (!data) {
      this.logger.log(`${accountId} try to finish unexciting game`);
      return null;
    }

    // Check start game
    const startGame = JSON.parse(data);
    if (
      startGame.matchId !== gameData.matchId ||
      startGame.gameId !== gameData.gameId
    ) {
      this.logger.log(`${accountId} try to finish invalid game`);
      return null;
    }

    return Date.now() - startGame.date;
  }

  public async endGame(
    gameData: EndGameDto,
    accountId: string,
    duration: number,
  ) {
    const gamesRepository = this.dbUnit.getGamesRepository();
    await gamesRepository.insert({
      id: uuid(),
      accountId,
      duration,
      gameId: gameData.gameId,
      data: gameData.matchData,
    });
  }
}
