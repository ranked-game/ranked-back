// Core
import { Controller, Get, Logger } from '@nestjs/common';

// Services
import { UnitOfWorkService } from '../dbl';

@Controller('account')
export class AccountsController {
  private readonly logger = new Logger(AccountsController.name);

  constructor(private readonly unitOfWork: UnitOfWorkService) {}

  @Get('/me')
  async currentUser() {}
}
