import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';
export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S*$/, { message: 'Username must not contain whitespace' })
  username?: string;
  @IsStrongPassword()
  @IsOptional()
  password?: string;
}
