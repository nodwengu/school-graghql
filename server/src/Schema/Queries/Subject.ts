import { SubjectType } from "../TypeDefs/Subject"
import { GraphQLList, GraphQLID } from "graphql"
import { resolve } from "path"
import { Subject } from "../../Entities/Subject"
import { getRepository } from "typeorm"


export const GET_ALL_SUBJECTS = {
   type: new GraphQLList(SubjectType),
   async resolve(parent: any, args: any) {
      return await getRepository(Subject).createQueryBuilder("s")
         .select(["s.subjectName", "s.id"])
         .orderBy("s.id")
         .getMany();
   }
}

export const GET_SUBJECT = {
   type: SubjectType,
   args: { id: { type: GraphQLID } },
   async resolve(parent: any, args: any) {
      const subject = await getRepository(Subject).createQueryBuilder("s")
         .select(["s.id", "s.subjectName"])
         .where("s.id = :id", {id: args.id})
         .getOne();

      if (!subject) {
         throw new Error("Subject with ID: " + args.id + " does not exists.");
      }
      return subject;
   }
}