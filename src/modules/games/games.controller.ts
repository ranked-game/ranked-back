// Core
import { Controller, Post, Body } from '@nestjs/common';

// Dto
import { StartGameDto } from './dto';

// Services
import { TrackerService } from './services';

// Decorators
import { User } from '../auth';

@Controller('games')
export class GamesController {
  constructor(private readonly trackerService: TrackerService) {}

  @Post('/start')
  async startGame(
    @Body() startGame: StartGameDto,
    @User('id') accountId: string,
  ) {
    await this.trackerService.startGame(startGame);
  }

  @Post('/end')
  async endGame() {}
}
