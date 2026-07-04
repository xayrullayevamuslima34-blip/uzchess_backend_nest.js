import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserConfirmLoginMeDto{
    @IsString()
    @Length(6, 6)
    @ApiProperty()
    code!: string;
}
