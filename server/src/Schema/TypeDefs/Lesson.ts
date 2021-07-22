import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { GradeType } from "./Grade";
import { Lesson } from "../../Entities/Lesson";
import { Grade } from "../../Entities/Grade";
import { SubjectType } from "./Subject";
import { DaysType } from "./Days";
import { Subject } from "../../Entities/Subject";
import { Days } from "../../Entities/Days";
import { resolve } from "path";
import { getRepository } from "typeorm";

export const LessonType = new GraphQLObjectType({
   name: "Lesson",
   fields: () => ({
      id: { type: GraphQLID },
      lessonName: { type: GraphQLString },
      time: { type: GraphQLString },
      subjectId: { type: GraphQLID },
      gradeId: { type: GraphQLID },
      dayId: { type: GraphQLID },
      subject: {
         type: SubjectType,
         args: { id: {type: GraphQLID} },
         async resolve(lesson: Lesson, args: any) {
            return await getRepository(Subject).createQueryBuilder('s')
               .select(['s.id', 's.subjectName'])
               .where('s.id = :id', { id: lesson.subjectId })
               .getOne();        
         }
      },
      grade: {
         type: GradeType,
         args: { id: {type: GraphQLID} },
         async resolve(lesson: Lesson, args: any) {
            return await getRepository(Grade).createQueryBuilder('g')
               .select(['g.id', 'g.gradeName'])
               .where('g.id = :id', { id: lesson.gradeId })
               .getOneOrFail();
         }
      },
      day: {
         type: DaysType,
         args: { id: {type: GraphQLID} },
         async resolve(lesson: Lesson, args: any) {
            return await getRepository(Days).createQueryBuilder('d')
               .select(['d.id', 'd.dayName'])
               .where('d.id = :id', { id: lesson.dayId })
               .getOne();
         }
      },

   })
});