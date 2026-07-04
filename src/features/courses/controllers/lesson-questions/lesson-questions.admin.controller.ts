import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {ApiBearerAuth} from "@nestjs/swagger";
import {Roles} from "../../../../core/decorators/roles.decorator";
import {Role} from "../../../../core/enums/role.enum";
import {LessonQuestionsAdminService} from "../../services/lesson-questions/lesson-questions.admin.service";
import {LessonQuestionsCreateAdminDto} from "../../dtos/lesson-questions/admin/lesson-questions.create.admin.dto";
import {LessonQuestionsUpdateAdminDto} from "../../dtos/lesson-questions/admin/lesson-questions.update.admin.dto";
import { LessonQuestionsFilter } from '../../filters/lesson-questions.filter';

@ApiBearerAuth()
@Roles(Role.Admin)
@Controller("admin/lesson-questions")
export class LessonQuestionsAdminController{

    constructor(private readonly lessonQuestionService: LessonQuestionsAdminService) {}

    @Get("list")
    async getAll(@Query() filter: LessonQuestionsFilter){
        return this.lessonQuestionService.getAll(filter)
    }

    @Get(":id")
    async getOne(@Param("id", ParseIntPipe) id: number){
        return this.lessonQuestionService.getOne(id)
    }

    @Post("create")
    async create(@Body() payload: LessonQuestionsCreateAdminDto){
        return this.lessonQuestionService.create(payload)
    }

    @Patch("update/:id")
    async update(@Param("id", ParseIntPipe) id: number, @Body() payload: LessonQuestionsUpdateAdminDto){
        return this.lessonQuestionService.update(id, payload)
    }

    @Delete("delete/:id")
    async delete(@Param("id", ParseIntPipe) id: number){
        return this.lessonQuestionService.delete(id)
    }

}
