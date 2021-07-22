import { GraphQLString, GraphQLID } from "graphql";
import { SubjectType } from "../TypeDefs/Subject"
import { MessageType } from "../TypeDefs/Messages"
import { Subject } from "../../Entities/Subject";
import { getRepository } from "typeorm";

export const CREATE_SUBJECT = {
    type: SubjectType,
    args: { subjectName: { type: GraphQLString } },
    async resolve(parent: any, args: any) {

      await getRepository(Subject).createQueryBuilder()
         .insert()
         .into(Subject)
         .values([ {subjectName: args.subjectName} ])
         .execute();

       return args;
    } 
}

export const UPDATE_SUBJECT = {
   type: MessageType,
   args: {
      id: { type: GraphQLID },
      subjectName: { type: GraphQLString }
   },
   async resolve(parent: any, args: any) {

      await getRepository(Subject).createQueryBuilder()
         .update(Subject)
         .set({ subjectName: args.subjectName })
         .where("id = :id", { id: args.id })
         .execute();

      return { successful: true, message: "SUBJECT SUCCESSFULLY UPDATED" };
   }
}


export const DELETE_SUBJECT = {
   type: MessageType,
   args: { id: { type: GraphQLID } },
   async resolve(parent: any, args: any) {
     
      await getRepository(Subject).createQueryBuilder()
         .delete()
         .from(Subject)
         .where("id = :id", { id: args.id })
         .execute();

      return { successful: true, message: "SUBJECT SUCCESSFULLY DELETED" };
   }
}