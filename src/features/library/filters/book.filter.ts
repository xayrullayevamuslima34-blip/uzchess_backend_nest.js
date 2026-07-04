import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BookFilter{
  @IsString()
  @IsOptional()
  @ApiProperty()
  search?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Type(() => Number)
  page?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Type(() => Number)
  size?: number;
}