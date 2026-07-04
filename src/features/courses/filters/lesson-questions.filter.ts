import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationFilters } from '../../../core/filters/pagination.filter';
import { ApiProperty } from '@nestjs/swagger';

export class LessonQuestionsFilter extends PaginationFilters{
  @IsString()
  @IsOptional()
  @ApiProperty({required : false})
  search? : string

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({required : false})
  courseLessonId? : number
}
