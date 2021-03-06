// Core
import { Controller, Post, Body, Get } from '@nestjs/common';

// Services
import { EmailService } from '../mail';
import { UnitOfWorkService } from '../dbl';

// Dto
import { SubscribeMvpDto } from './dto';

// Utils
import { v4 as uuid } from 'uuid';
import { ApiImplicitBody } from '@nestjs/swagger';

// Docs
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('contact')
@Controller('contact')
export class ContactController {
  constructor(
    private readonly emailService: EmailService,
    private readonly unitOfWork: UnitOfWorkService,
  ) {}

  @Post('mvp/subscribe')
  @ApiImplicitBody({ name: '', type: SubscribeMvpDto })
  async subscribeMvp(@Body() subscriber: SubscribeMvpDto) {
    const { email } = subscriber;

    // Send email
    await this.emailService.sendPromotionalEmail(email);

    // Save to db
    const mvpRepository = await this.unitOfWork.getMvpSubscribersRepository();
    const user = await mvpRepository.findOne({ email });
    if (!user) {
      await mvpRepository.insert({ id: uuid(), email });
    }

    return { success: true };
  }

  @Get('mvp/subscribe')
  async subscribers() {
    // Save to db
    const mvpRepository = await this.unitOfWork.getMvpSubscribersRepository();
    const subscribers = await mvpRepository.find();

    return { success: true, data: subscribers };
  }
}
