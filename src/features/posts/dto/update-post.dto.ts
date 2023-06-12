import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  body?: string;

  @IsString()
  @IsOptional()
  coverImage?: string;
}
