import { Injectable, NotFoundException } from '@nestjs/common';
import { LessonUserAnswersFilter } from '../../filters/lesson-user-answers.filter';
import { LessonUserAnswersRepository } from '../../repositories/lesson-user-answers.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LessonUserAnswersAdminService {

  constructor(protected readonly config: ConfigService,
              protected readonly repo: LessonUserAnswersRepository) {
  }

  async getAll(filter: LessonUserAnswersFilter) {
    return await this.repo.getAll(filter);
  }

  async getOne(id: number) {
    const answer = await this.repo.getOneById(id);
    if (!answer) {
      throw new NotFoundException('Answer not found');
    }
    return answer;
  }
}
