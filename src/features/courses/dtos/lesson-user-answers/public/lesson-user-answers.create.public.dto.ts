import {IsInt} from "class-validator";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class LessonUserAnswersCreatePublicDto{
    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    lessonQuestionId!: number;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    lessonQuestionOptionId!: number;
}
