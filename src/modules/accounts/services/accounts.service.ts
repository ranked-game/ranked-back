// Core
import { Injectable } from '@nestjs/common';

// Services
import { AccountEntity } from '../../dbl/models';
import { UnitOfWorkService } from '../../dbl/services';

// Utils
import { v4 as uuid } from 'uuid';

@Injectable()
export class AccountsService {
  constructor(private readonly unitOfWorkService: UnitOfWorkService) {}

  async create(email: string) {
    const accountRepository = this.unitOfWorkService.getAccountRepository();

    const accountEntity = new AccountEntity();
    accountEntity.id = uuid();
    accountEntity.email = email;
    accountEntity.nickname = email.split('@')[0];

    await accountRepository.insert(accountEntity);

    return accountEntity;
  }

  async findByEmail(email: string) {
    const accountRepository = this.unitOfWorkService.getAccountRepository();
    const account = await accountRepository.findOne({ where: { email } });

    return account;
  }
}
