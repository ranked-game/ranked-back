// Core
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Models
import { AccountEntity, MvpSubscribersEntity } from '../models';

@Injectable()
export class UnitOfWorkService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly mvpSubscribersRepository: Repository<MvpSubscribersEntity>,
  ) {}

  getAccountRepository(): Repository<AccountEntity> {
    return this.accountRepository;
  }

  getMvpSubscribersRepository(): Repository<MvpSubscribersEntity> {
    return this.accountRepository;
  }
}
