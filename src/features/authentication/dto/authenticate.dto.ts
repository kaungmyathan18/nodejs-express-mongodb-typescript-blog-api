import { IsString } from 'class-validator';

export class AuthenticateDTO {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
