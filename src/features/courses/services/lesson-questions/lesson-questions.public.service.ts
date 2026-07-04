import { Injectable, NotFoundException } from '@nestjs/common';
import { LessonQuestionsFilter } from '../../filters/lesson-questions.filter';
import { LessonQuestionsRepository } from '../../repositories/lesson-questions.repository';
import { LessonQuestionOptions } from '../../entities/lesson-question-options.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LessonQuestionsPublicService {

  constructor(protected readonly config: ConfigService,
              protected readonly repo: LessonQuestionsRepository) {
  }

  async getAll(filter: LessonQuestionsFilter) {
    const questions = await this.repo.getAll(filter);
    for (const question of questions.data) {
      const options = await LessonQuestionOptions.findBy({ lessonQuestionId: question.id });
      question.options = options.map(({ isCorrect, ...option }) => option) as LessonQuestionOptions[];
    }
    return questions;
  }

  async getOne(id: number) {
    const question = await this.repo.getOneWithOptions(id);
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    question.options = question.options?.map(({ isCorrect, ...option }) => option) as LessonQuestionOptions[];
    return question;
  }
}
