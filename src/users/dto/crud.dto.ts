import {
    ArrayMaxSize, ArrayNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min
} from "class-validator";

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
    @IsNotEmpty()
    readonly password: string;

    @IsString({ each: true })
    @ArrayNotEmpty()
    @ArrayMaxSize(6)
    readonly role: string[];
}

export class UpdateUserDto {

    //@IsJWT()
    //readonly jwt: string;

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
    readonly password: string;

    @IsString({ each: true })
    @ArrayNotEmpty()
    @ArrayMaxSize(6)
    readonly role: string[];
}

export class DeleteUserDto {
    //@IsJWT()
    //readonly jwt: string;

    @IsNumber()
    @Min(0)
    readonly id: number;
}