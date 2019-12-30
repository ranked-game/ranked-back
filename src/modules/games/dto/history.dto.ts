import { IsNumberString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class HistoryDto {
  @ApiModelProperty()
  @IsNumberString()
  page: number;

  @ApiModelProperty()
  @IsNumberString()
  limit: number;
}
