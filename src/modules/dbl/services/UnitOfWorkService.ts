// Core
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Models
import { AccountEntity } from '../models';

@Injectable()
export class UnitOfWorkService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<Account>,
  ) {}

  getAccountRepository(): Repository<Account> {
    return this.accountRepository;
  }
}
