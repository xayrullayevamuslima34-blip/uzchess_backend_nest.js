import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {BaseModel} from "../../../core/base-module";
import {LessonQuestions} from "./lesson-questions.entity";
import {LessonUserAnswers} from "./lesson-user-answers.entity";

@Entity("lesson-question-options")
export class LessonQuestionOptions extends BaseModel{
    @Column()
    lessonQuestionId!: number;

    @ManyToOne(() => LessonQuestions, (LessonQuestions) => LessonQuestions.options, {onDelete: "RESTRICT"})
    @JoinColumn({name: "lessonQuestionId"})
    lessonQuestion!: LessonQuestions;

    @Column({type: "varchar", length: 256})
    text!: string;

    @Column({default: false})
    isCorrect!: boolean;

    @OneToMany(() => LessonUserAnswers, (LessonUserAnswers) => LessonUserAnswers.lessonQuestionOption)
    userAnswers?: LessonUserAnswers[];
}
