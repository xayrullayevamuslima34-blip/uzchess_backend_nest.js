import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import argon2 from 'argon2';
import { ILike } from 'typeorm';
import { UserFilter } from '../../filters/user.filter';
import { UserRepository } from '../../repositories/user.repository';
import { ConfigService } from '@nestjs/config';
import {Users} from "../../entities/user.entity";
import {UserUpdateMeDto} from "../../dtos/users/public/user.update.me.dto";
import {UserUpdatePasswordMeDto} from "../../dtos/users/public/user.update-password.me.dto";
import {UserUpdateLoginMeDto} from "../../dtos/users/public/user.update-login.me.dto";
import {UserConfirmLoginMeDto} from "../../dtos/users/public/user.confirm-login.me.dto";
import {OtpCodePublicService} from "../../../authorization/services/otp-codes/otp-code.public.service";
import {OtpCode} from "../../../authorization/entities/otp-codes.entity";
import {OtpType} from "../../../../core/enums/otp-type.enum";
import {User} from "../../../authorization/entities/authentication.entity";

@Injectable()
export class UsersPublicService{

    constructor(protected readonly config: ConfigService,
                protected readonly repo: UserRepository,
                protected readonly otpService: OtpCodePublicService) {
    }

    async getAll(filter: UserFilter){
        return await this.repo.getAll(filter)
    }

    async getOne(id: number){
        const users = await this.repo.getOneById(id)
        if(!users){
            throw new NotFoundException("User not found")
        }
        return users
    }

    async getMe(userId: number){
        const user = await this.repo.getOneById(userId)
        if(!user){
            throw new NotFoundException("User not found")
        }
        return user
    }

    async updateMe(userId: number, payload: UserUpdateMeDto, profileImage?: Express.Multer.File){
        const user = await this.repo.getOneById(userId)
        if(!user){
            throw new NotFoundException("User not found")
        }
        Object.assign(user,
            Object.fromEntries(
                Object.entries(payload).filter(([key, value]) => value)
            ))
        if(profileImage){
            user.profileImage = profileImage.path
        }
        return await this.repo.save(user)
    }

    async updatePassword(userId: number, payload: UserUpdatePasswordMeDto){
        const user = await this.repo.getOneById(userId)
        if(!user || !user.password){
            throw new NotFoundException("User not found")
        }

        const passwordsMatch = await argon2.verify(user.password, payload.oldPassword)
        if(!passwordsMatch){
            throw new UnauthorizedException("Old password is wrong")
        }

        user.password = await argon2.hash(payload.newPassword)
        return await this.repo.save(user)
    }

    async updateLogin(userId: number, payload: UserUpdateLoginMeDto){
        const user = await this.repo.getOneById(userId)
        if(!user){
            throw new NotFoundException("User not found")
        }

        const exists = await Users.findOneBy({ login: ILike(payload.login) })
        if(exists){
            throw new BadRequestException("User with given login already exists")
        }

        user.pendingLogin = payload.login
        user.pendingLoginType = payload.loginType
        await this.repo.save(user)

        await this.otpService.sendOtp(user as unknown as User, OtpType.NumberChange)
    }

    async confirmLogin(userId: number, payload: UserConfirmLoginMeDto){
        const user = await this.repo.getOneById(userId)
        if(!user){
            throw new NotFoundException("User not found")
        }

        if(!user.pendingLogin || !user.pendingLoginType){
            throw new BadRequestException("No login change requested")
        }

        const otpCode = await OtpCode.findOneBy({ userId: user.id, code: payload.code, type: OtpType.NumberChange })
        if(!otpCode){
            throw new BadRequestException("Code is wrong")
        }

        const otpExpire = this.config.getOrThrow<number>('OTP_EXPIRE') * 1000
        const difference = Date.now() - Date.parse(otpCode.createdAt)
        if(difference > otpExpire){
            throw new BadRequestException("Code expired")
        }

        user.login = user.pendingLogin
        user.loginType = user.pendingLoginType
        user.pendingLogin = undefined
        user.pendingLoginType = undefined

        await this.repo.save(user)
        await OtpCode.remove(otpCode)
        return { message: "Login updated" }
    }

}