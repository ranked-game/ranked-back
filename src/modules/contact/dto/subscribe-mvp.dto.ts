import { IsEmail } from 'class-validator';

export class SubscribeMvpDto {
  @IsEmail()
  email: string;
}
