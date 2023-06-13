import { IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  username: string;
  @IsStrongPassword()
  password: string;
}
