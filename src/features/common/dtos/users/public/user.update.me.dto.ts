import {Allow, IsOptional, IsString, MaxLength} from "class-validator";
import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UserUpdateMeDto{
    @IsString()
    @IsOptional()
    @MaxLength(64)
    @Expose()
    @ApiProperty({required: false})
    fullName?: string;

    @Allow()
    @ApiProperty({type: "string", format: "binary", required: false})
    profileImage?: string;

    @IsString()
    @IsOptional()
    @Expose()
    @ApiProperty({required: false})
    birthDate?: string;
}
