import { IsString } from 'class-validator';

export class AutheticateDTO {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
