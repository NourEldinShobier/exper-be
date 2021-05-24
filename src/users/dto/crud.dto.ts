import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly phone?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Provided password is too weak' },
  )
  readonly password: string;

  @IsString({ each: true })
  @ArrayNotEmpty()
  @ArrayMaxSize(6)
  readonly role: string[];
}

export class UpdateUserDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly phone?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Provided password is too weak' },
  )
  readonly password: string;

  @IsString({ each: true })
  @ArrayNotEmpty()
  @ArrayMaxSize(6)
  readonly role: string[];
}