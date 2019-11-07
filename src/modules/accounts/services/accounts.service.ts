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

  async create(email: string, avatar?: string) {
    const accountRepository = this.unitOfWorkService.getAccountRepository();

    const accountEntity = new AccountEntity();
    accountEntity.id = uuid();
    accountEntity.email = email;
    accountEntity.nickname = email.split('@')[0];
    accountEntity.avatar = avatar;

    await accountRepository.insert(accountEntity);

    return accountEntity;
  }

  async findByEmail(email: string) {
    const accountRepository = this.unitOfWorkService.getAccountRepository();
    const account = await accountRepository.findOne({ where: { email } });

    return account;
  }

  async updateAvatar(id: string, avatar: string) {
    const accountRepository = this.unitOfWorkService.getAccountRepository();

    await accountRepository.update(id, { avatar });

    return true;
  }
}
