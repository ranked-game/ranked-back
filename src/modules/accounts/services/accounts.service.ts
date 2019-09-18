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
    const a = new AccountEntity();
    a.id = uuid();
    a.email = email;
    const account = await accountRepository.insert(a);

    return account;
  }
}
