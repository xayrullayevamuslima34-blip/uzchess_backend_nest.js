import {IsInt, IsOptional, IsString, MaxLength} from "class-validator";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class LessonQuestionsUpdateAdminDto{
    @IsString()
    @IsOptional()
    @MaxLength(256)
    @ApiProperty({required: false})
    question?: string;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({required: false})
    order?: number;
}
