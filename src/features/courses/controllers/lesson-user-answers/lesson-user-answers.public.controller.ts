import type {Request} from "express";
import {Body, Controller, Get, Post, Query, Req, UseGuards} from "@nestjs/common";
import {ApiBearerAuth} from "@nestjs/swagger";
import {AuthenticationGuard} from "../../../../core/guards/authentication.guard";
import {RolesGuard} from "../../../../core/guards/role.guard";
import {Roles} from "../../../../core/decorators/roles.decorator";
import {Role} from "../../../../core/enums/role.enum";
import {LessonUserAnswersPublicService} from "../../services/lesson-user-answers/lesson-user-answers.public.service";
import {LessonUserAnswersCreatePublicDto} from "../../dtos/lesson-user-answers/public/lesson-user-answers.create.public.dto";
import { LessonUserAnswersFilter } from '../../filters/lesson-user-answers.filter';

@ApiBearerAuth()
@UseGuards(AuthenticationGuard, RolesGuard)
@Roles(Role.User)
@Controller("public/lesson-user-answers")
export class LessonUserAnswersPublicController{

    constructor(private readonly lessonUserAnswerService: LessonUserAnswersPublicService) {}

    @Get("list")
    async getAll(@Req() request: Request, @Query() filter: LessonUserAnswersFilter){
        //@ts-ignore
        return this.lessonUserAnswerService.getAll(filter, request.user.id)
    }

    @Post("answer")
    async answer(@Req() request: Request, @Body() payload: LessonUserAnswersCreatePublicDto){
        //@ts-ignore
        return this.lessonUserAnswerService.answer(payload, request.user.id)
    }

}
