// Core
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Models
import { AccountEntity, MvpSubscribersEntity, GameEntity } from '../models';

@Injectable()
export class UnitOfWorkService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(MvpSubscribersEntity)
    private readonly mvpSubscribersRepository: Repository<MvpSubscribersEntity>,
    @InjectRepository(GameEntity)
    private readonly gamesRepository: Repository<GameEntity>,
  ) {}

  getAccountRepository(): Repository<AccountEntity> {
    return this.accountRepository;
  }

  getMvpSubscribersRepository(): Repository<MvpSubscribersEntity> {
    return this.mvpSubscribersRepository;
  }

  getGamesRepository(): Repository<GameEntity> {
    return this.gamesRepository;
  }
}
