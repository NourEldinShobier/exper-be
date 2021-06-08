import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGroupDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly day: string;
}

export class UpdateGroupDto {

  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly day: string;
}