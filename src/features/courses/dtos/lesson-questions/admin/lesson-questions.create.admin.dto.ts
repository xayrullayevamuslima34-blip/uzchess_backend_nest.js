import {IsArray, IsBoolean, IsInt, IsOptional, IsString, MaxLength, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class LessonQuestionOptionCreateAdminDto{
    @IsString()
    @MaxLength(256)
    @ApiProperty()
    text!: string;

    @IsBoolean()
    @ApiProperty()
    isCorrect!: boolean;
}

export class LessonQuestionsCreateAdminDto{
    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    courseLessonId!: number;

    @IsString()
    @MaxLength(256)
    @ApiProperty()
    question!: string;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({required: false})
    order?: number;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => LessonQuestionOptionCreateAdminDto)
    @ApiProperty({type: [LessonQuestionOptionCreateAdminDto]})
    options!: LessonQuestionOptionCreateAdminDto[];
}
