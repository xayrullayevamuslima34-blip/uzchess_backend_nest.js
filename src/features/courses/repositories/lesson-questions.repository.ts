import { BaseRepository } from '../../../core/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { LessonQuestions } from '../entities/lesson-questions.entity';
import { LessonQuestionsFilter } from '../filters/lesson-questions.filter';

@Injectable()
export class LessonQuestionsRepository extends BaseRepository<LessonQuestions>{

  constructor(protected readonly config: ConfigService,
              @InjectRepository(LessonQuestions)
              protected readonly repo: Repository<LessonQuestions>) {
    super();
  }

  async getAll(filters : LessonQuestionsFilter){
    const whereOptions: FindOptionsWhere<LessonQuestions> = {}

    if(filters.search){
      whereOptions.question = ILike(`%${filters.search}%`)
    }
    if(filters.courseLessonId){
      whereOptions.courseLessonId = filters.courseLessonId
    }
    return await super.getAll(filters, whereOptions)
  }

  async getOneWithOptions(id: number){
    return this.repo.findOne({ where: { id }, relations: { options: true } })
  }
}
