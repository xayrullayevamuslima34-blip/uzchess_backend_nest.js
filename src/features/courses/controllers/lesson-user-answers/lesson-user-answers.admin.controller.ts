import {Controller, Get, Param, ParseIntPipe, Query} from "@nestjs/common";
import {ApiBearerAuth} from "@nestjs/swagger";
import {Roles} from "../../../../core/decorators/roles.decorator";
import {Role} from "../../../../core/enums/role.enum";
import {LessonUserAnswersAdminService} from "../../services/lesson-user-answers/lesson-user-answers.admin.service";
import { LessonUserAnswersFilter } from '../../filters/lesson-user-answers.filter';

@ApiBearerAuth()
@Roles(Role.Admin)
@Controller("admin/lesson-user-answers")
export class LessonUserAnswersAdminController{

    constructor(private readonly lessonUserAnswerService: LessonUserAnswersAdminService) {}

    @Get("list")
    async getAll(@Query() filter: LessonUserAnswersFilter){
        return this.lessonUserAnswerService.getAll(filter)
    }

    @Get(":id")
    async getOne(@Param("id", ParseIntPipe) id: number){
        return this.lessonUserAnswerService.getOne(id)
    }

}
