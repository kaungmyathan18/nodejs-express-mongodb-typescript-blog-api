import { IsString, MinLength } from "class-validator";

export class CreatePostDTO {

    @IsString()
    @MinLength(10)
    title:string;

    @IsString()
    body:string;

    @IsString()
    coverImage:string;
}