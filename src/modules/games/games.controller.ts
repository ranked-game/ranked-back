// Core
import { Controller, Post, Body, HttpException, Get } from '@nestjs/common';

// Dto
import { StartGameDto, EndGameDto } from './dto';

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
    await this.trackerService.startGame(startGame, accountId);

    return { success: true, data: startGame };
  }

  @Post('/end')
  async endGame(@Body() endGame: EndGameDto, @User('id') accountId: string) {
    // Calculate game duration
    const duration = await this.trackerService.gameDuration(endGame, accountId);
    if (!duration) {
      throw new HttpException(
        { success: false, error: 'Unable to finish game' },
        403,
      );
    }

    // Create end game record
    const data = await this.trackerService.endGame(
      endGame,
      accountId,
      duration,
    );

    return { success: true, data };
  }

  @Get('/history')
  async history(@User('id') accountId: string) {
    const data = await this.trackerService.history(accountId);

    return { success: true, data };
  }
}
