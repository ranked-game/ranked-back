// Core
import { Controller, Post, Body } from '@nestjs/common';

// Dto
import { StartGameDto } from './dto';

@Controller('games')
export class GamesController {
  constructor() {}

  @Post('/start')
  async startGame(@Body() body: StartGameDto) {}

  @Post('/end')
  async endGame() {}
}
