import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { GradeType } from "./Grade";
import { Lesson } from "../../Entities/Lesson";
import { Grade } from "../../Entities/Grade";
import { SubjectType } from "./Subject";
import { DaysType } from "./Days";
import { Subject } from "../../Entities/Subject";
import { Days } from "../../Entities/Days";

export const LessonType = new GraphQLObjectType({
   name: "Lesson",
   fields: () => ({
      id: { type: GraphQLID },
      lessonName: { type: GraphQLString },
      subject_id: { type: GraphQLID },
      grade_id: { type: GraphQLID },
      day_id: { type: GraphQLID },
      subject: {
         type: SubjectType,
         resolve: async (lesson: Lesson) => await Subject.findOne({ id: lesson.subject_id })
      },
      grade: {
         type: GradeType,
         resolve: async (lesson: Lesson) => await Grade.findOne({ id: lesson.grade_id }),
      },
      day: {
         type: DaysType,
         resolve: async (lesson: Lesson) => await Days.findOne({ id: lesson.day_id })
      },

   })
});