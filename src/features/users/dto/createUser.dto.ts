import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S*$/, { message: 'Username must not contain whitespace' })
  username: string;
  @IsStrongPassword()
  password: string;
}
