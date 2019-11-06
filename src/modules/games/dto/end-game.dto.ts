import { IsString, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class EndGameDto {
  @ApiModelProperty()
  @Length(4, 7)
  @IsString()
  gameId: string;

  @ApiModelProperty()
  @IsString()
  matchId: string;

  @ApiModelProperty()
  matchData: object;
}
