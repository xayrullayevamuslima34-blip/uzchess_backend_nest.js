import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationFilters } from '../../../core/filters/pagination.filter';
import { ApiProperty } from '@nestjs/swagger';

export class LessonUserAnswersFilter extends PaginationFilters{
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({required : false})
  lessonQuestionId? : number

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({required : false})
  userId? : number
}
