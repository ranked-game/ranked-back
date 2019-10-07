// Core
import { Controller, Post, Body } from '@nestjs/common';

// Dto
import { StartGameDto } from './dto';

// Services
import { TrackerService } from './services';

@Controller('games')
export class GamesController {
  constructor(private readonly trackerService: TrackerService) {}

  @Post('/start')
  async startGame(@Body() body: StartGameDto) {
    await this.trackerService.startGame(body);
  }

  @Post('/end')
  async endGame() {}
}
