import { Injectable, NotFoundException } from '@nestjs/common';
import { LessonQuestions } from '../../entities/lesson-questions.entity';
import { LessonQuestionOptions } from '../../entities/lesson-question-options.entity';
import { CourseLessons } from '../../entities/course-lessons.entity';
import { LessonQuestionsFilter } from '../../filters/lesson-questions.filter';
import { LessonQuestionsRepository } from '../../repositories/lesson-questions.repository';
import { LessonQuestionsCreateAdminDto } from '../../dtos/lesson-questions/admin/lesson-questions.create.admin.dto';
import { LessonQuestionsUpdateAdminDto } from '../../dtos/lesson-questions/admin/lesson-questions.update.admin.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LessonQuestionsAdminService {

  constructor(protected readonly config: ConfigService,
              protected readonly repo: LessonQuestionsRepository) {
  }

  async getAll(filter: LessonQuestionsFilter) {
    return await this.repo.getAll(filter);
  }

  async getOne(id: number) {
    const question = await this.repo.getOneWithOptions(id);
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }

  async create(payload: LessonQuestionsCreateAdminDto) {
    const lesson = await CourseLessons.findOneBy({ id: payload.courseLessonId });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const question = LessonQuestions.create({
      courseLessonId: payload.courseLessonId,
      question: payload.question,
      order: payload.order,
    });
    await this.repo.save(question);

    for (const option of payload.options) {
      const newOption = LessonQuestionOptions.create({
        lessonQuestionId: question.id,
        text: option.text,
        isCorrect: option.isCorrect,
      });
      await LessonQuestionOptions.save(newOption);
    }

    return await this.repo.getOneWithOptions(question.id);
  }

  async update(id: number, payload: LessonQuestionsUpdateAdminDto) {
    const question = await this.repo.getOneById(id);
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    Object.assign(question,
      Object.fromEntries(
        Object.entries(payload).filter(([key, value]) => value)
      ));
    return await this.repo.save(question);
  }

  async delete(id: number) {
    const question = await this.repo.getOneById(id);
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const options = await LessonQuestionOptions.findBy({ lessonQuestionId: question.id });
    await LessonQuestionOptions.remove(options);

    return await this.repo.delete(question);
  }
}
