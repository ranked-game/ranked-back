// Core
import { Controller, Get, Logger } from '@nestjs/common';

// Services
import { UnitOfWorkService, AccountEntity } from '../dbl';

// Decorators
import { User } from '../auth';

// Utils
import { Repository } from 'typeorm';

// Docs
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('account')
@Controller('account')
export class AccountsController {
  private readonly logger = new Logger(AccountsController.name);
  private readonly accountsRepository: Repository<AccountEntity>;

  constructor(private readonly unitOfWork: UnitOfWorkService) {
    this.accountsRepository = unitOfWork.getAccountRepository();
  }

  @Get('/me')
  async currentUser(@User('id') accountId: string) {
    const account = await this.accountsRepository.findOne({ id: accountId });

    return {
      id: account.id,
      email: account.email,
      nickname: account.nickname,
      avatar: account.avatar,
      league: '',
      gamesPlayedLifetime: 0,
      currentTournaments: [],
      team: {},
      pointsEarnedLifetime: { solo: 0, party: 0 },
    };
  }
}
