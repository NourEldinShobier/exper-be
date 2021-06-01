import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}