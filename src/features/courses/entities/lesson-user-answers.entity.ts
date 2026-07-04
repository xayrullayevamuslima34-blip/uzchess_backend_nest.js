import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModel} from "../../../core/base-module";
import {Users} from "../../common/entities/user.entity";
import {LessonQuestions} from "./lesson-questions.entity";
import {LessonQuestionOptions} from "./lesson-question-options.entity";

@Entity("lesson-user-answers")
export class LessonUserAnswers extends BaseModel{
    @Column()
    userId!: number;

    @ManyToOne(() => Users, (Users) => Users.lessonUserAnswers, {onDelete: "RESTRICT"})
    @JoinColumn({name: "userId"})
    user!: Users;

    @Column()
    lessonQuestionId!: number;

    @ManyToOne(() => LessonQuestions, (LessonQuestions) => LessonQuestions.userAnswers, {onDelete: "RESTRICT"})
    @JoinColumn({name: "lessonQuestionId"})
    lessonQuestion!: LessonQuestions;

    @Column()
    lessonQuestionOptionId!: number;

    @ManyToOne(() => LessonQuestionOptions, (LessonQuestionOptions) => LessonQuestionOptions.userAnswers, {onDelete: "RESTRICT"})
    @JoinColumn({name: "lessonQuestionOptionId"})
    lessonQuestionOption!: LessonQuestionOptions;

    @Column({default: false})
    isCorrect!: boolean;
}
