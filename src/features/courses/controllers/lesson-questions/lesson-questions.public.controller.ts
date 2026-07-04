import {Controller, Get, Param, ParseIntPipe, Query, UseGuards} from "@nestjs/common";
import {ApiBearerAuth} from "@nestjs/swagger";
import {AuthenticationGuard} from "../../../../core/guards/authentication.guard";
import {RolesGuard} from "../../../../core/guards/role.guard";
import {Roles} from "../../../../core/decorators/roles.decorator";
import {Role} from "../../../../core/enums/role.enum";
import {LessonQuestionsPublicService} from "../../services/lesson-questions/lesson-questions.public.service";
import { LessonQuestionsFilter } from '../../filters/lesson-questions.filter';

@ApiBearerAuth()
@UseGuards(AuthenticationGuard, RolesGuard)
@Roles(Role.User)
@Controller("public/lesson-questions")
export class LessonQuestionsPublicController{

    constructor(private readonly lessonQuestionService: LessonQuestionsPublicService) {}

    @Get("list")
    async getAll(@Query() filter: LessonQuestionsFilter){
        return this.lessonQuestionService.getAll(filter)
    }

    @Get(":id")
    async getOne(@Param("id", ParseIntPipe) id: number){
        return this.lessonQuestionService.getOne(id)
    }

}
