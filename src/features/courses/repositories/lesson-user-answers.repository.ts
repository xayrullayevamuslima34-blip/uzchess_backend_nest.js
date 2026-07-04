import { BaseRepository } from '../../../core/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { FindOptionsWhere, Repository } from 'typeorm';
import { LessonUserAnswers } from '../entities/lesson-user-answers.entity';
import { LessonUserAnswersFilter } from '../filters/lesson-user-answers.filter';

@Injectable()
export class LessonUserAnswersRepository extends BaseRepository<LessonUserAnswers>{

  constructor(protected readonly config: ConfigService,
              @InjectRepository(LessonUserAnswers)
              protected readonly repo: Repository<LessonUserAnswers>) {
    super();
  }

  async getAll(filters : LessonUserAnswersFilter){
    const whereOptions: FindOptionsWhere<LessonUserAnswers> = {}

    if(filters.lessonQuestionId){
      whereOptions.lessonQuestionId = filters.lessonQuestionId
    }
    if(filters.userId){
      whereOptions.userId = filters.userId
    }
    return await super.getAll(filters, whereOptions)
  }
}
