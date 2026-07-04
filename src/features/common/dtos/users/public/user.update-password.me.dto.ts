import {IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserUpdatePasswordMeDto{
    @IsString()
    @MaxLength(32)
    @ApiProperty()
    oldPassword!: string;

    @IsString()
    @MaxLength(32)
    @ApiProperty()
    newPassword!: string;
}
