import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { LessonUserAnswers } from '../../entities/lesson-user-answers.entity';
import { LessonQuestions } from '../../entities/lesson-questions.entity';
import { LessonQuestionOptions } from '../../entities/lesson-question-options.entity';
import { LessonUserAnswersFilter } from '../../filters/lesson-user-answers.filter';
import { LessonUserAnswersRepository } from '../../repositories/lesson-user-answers.repository';
import { LessonUserAnswersCreatePublicDto } from '../../dtos/lesson-user-answers/public/lesson-user-answers.create.public.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LessonUserAnswersPublicService {

  constructor(protected readonly config: ConfigService,
              protected readonly repo: LessonUserAnswersRepository) {
  }

  async getAll(filter: LessonUserAnswersFilter, userId: number) {
    filter.userId = userId;
    return await this.repo.getAll(filter);
  }

  async answer(payload: LessonUserAnswersCreatePublicDto, userId: number) {
    const question = await LessonQuestions.findOneBy({ id: payload.lessonQuestionId });
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const option = await LessonQuestionOptions.findOneBy({
      id: payload.lessonQuestionOptionId,
      lessonQuestionId: question.id,
    });
    if (!option) {
      throw new BadRequestException('Option does not belong to given question');
    }

    let answer = await LessonUserAnswers.findOneBy({ userId, lessonQuestionId: question.id });
    if (answer) {
      answer.lessonQuestionOptionId = option.id;
      answer.isCorrect = option.isCorrect;
    } else {
      answer = LessonUserAnswers.create({
        userId,
        lessonQuestionId: question.id,
        lessonQuestionOptionId: option.id,
        isCorrect: option.isCorrect,
      });
    }
    await this.repo.save(answer);

    return { isCorrect: option.isCorrect };
  }
}
