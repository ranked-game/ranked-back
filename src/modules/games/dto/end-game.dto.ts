import { IsString, Length } from 'class-validator';

export class EndGameDto {
  @Length(4, 7)
  @IsString()
  gameId: string;

  @IsString()
  matchId: string;

  matchData: object;
}
