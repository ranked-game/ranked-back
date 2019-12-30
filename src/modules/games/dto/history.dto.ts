import { IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class HistoryDto {
  @ApiModelProperty()
  @IsNumber()
  page: number;

  @ApiModelProperty()
  @IsNumber()
  limit: number;
}
