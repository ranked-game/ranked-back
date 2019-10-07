import { IsString, Length } from 'class-validator';

export class StartGameDto {
  @Length(4, 7)
  @IsString()
  gameId: string;

  @IsString()
  matchId: string;

  party: object;
}
