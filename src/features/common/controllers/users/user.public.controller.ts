import type {Request} from "express";
import {Body, Controller, Get, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors} from "@nestjs/common";
import {UsersPublicService} from "../../services/users/user.public.service";
import {AuthenticationGuard} from "../../../../core/guards/authentication.guard";
import {RolesGuard} from "../../../../core/guards/role.guard";
import { UserFilter } from '../../filters/user.filter';
import {ApiBearerAuth} from "@nestjs/swagger";
import {Roles} from "../../../../core/decorators/roles.decorator";
import {Role} from "../../../../core/enums/role.enum";
import {FileInterceptor} from "@nestjs/platform-express";
import {storageOptions} from "../../../../config/multer.config";
import {UserUpdateMeDto} from "../../dtos/users/public/user.update.me.dto";
import {UserUpdatePasswordMeDto} from "../../dtos/users/public/user.update-password.me.dto";
import {UserUpdateLoginMeDto} from "../../dtos/users/public/user.update-login.me.dto";
import {UserConfirmLoginMeDto} from "../../dtos/users/public/user.confirm-login.me.dto";

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller("public/users")
export class UsersPublicController{

    constructor(private readonly userService: UsersPublicService) {}

    @Get("list")
    async getAll(@Query() filter: UserFilter){
        return this.userService.getAll(filter)
    }

    @ApiBearerAuth()
    @Roles(Role.User)
    @Get("me")
    async getMe(@Req() request: Request){
        //@ts-ignore
        return this.userService.getMe(request.user.id)
    }

    @ApiBearerAuth()
    @Roles(Role.User)
    @UseInterceptors(FileInterceptor('profileImage', {storage: storageOptions}))
    @Patch("me/update")
    async updateMe(@Req() request: Request, @Body() payload: UserUpdateMeDto, @UploadedFile() profileImage: Express.Multer.File){
        //@ts-ignore
        return this.userService.updateMe(request.user.id, payload, profileImage)
    }

    @ApiBearerAuth()
    @Roles(Role.User)
    @Patch("me/update-password")
    async updatePassword(@Req() request: Request, @Body() payload: UserUpdatePasswordMeDto){
        //@ts-ignore
        return this.userService.updatePassword(request.user.id, payload)
    }

    @ApiBearerAuth()
    @Roles(Role.User)
    @Post("me/update-login")
    async updateLogin(@Req() request: Request, @Body() payload: UserUpdateLoginMeDto){
        //@ts-ignore
        return this.userService.updateLogin(request.user.id, payload)
    }

    @ApiBearerAuth()
    @Roles(Role.User)
    @Post("me/confirm-login")
    async confirmLogin(@Req() request: Request, @Body() payload: UserConfirmLoginMeDto){
        //@ts-ignore
        return this.userService.confirmLogin(request.user.id, payload)
    }

    @Get(":id")
    async getOne(@Param("id") id: number){
        return this.userService.getOne(id)
    }

}
