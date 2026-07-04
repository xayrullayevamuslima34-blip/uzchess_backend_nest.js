import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {BaseModel} from "../../../core/base-module";
import {CourseLessons} from "./course-lessons.entity";
import {LessonQuestionOptions} from "./lesson-question-options.entity";
import {LessonUserAnswers} from "./lesson-user-answers.entity";

@Entity("lesson-questions")
export class LessonQuestions extends BaseModel{
    @Column()
    courseLessonId!: number;

    @ManyToOne(() => CourseLessons, (CourseLessons) => CourseLessons.lessonQuestions, {onDelete: "RESTRICT"})
    @JoinColumn({name: "courseLessonId"})
    courseLesson!: CourseLessons;

    @Column({type: "varchar", length: 256})
    question!: string;

    @Column({nullable: true})
    order!: number;

    @OneToMany(() => LessonQuestionOptions, (LessonQuestionOptions) => LessonQuestionOptions.lessonQuestion)
    options?: LessonQuestionOptions[];

    @OneToMany(() => LessonUserAnswers, (LessonUserAnswers) => LessonUserAnswers.lessonQuestion)
    userAnswers?: LessonUserAnswers[];
}
