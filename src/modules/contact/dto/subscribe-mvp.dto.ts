import { IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SubscribeMvpDto {
  @ApiModelProperty()
  @IsEmail()
  email: string;
}
