
import { GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';
import { Learner } from '../../Entities/Learner';
import { LearnerType } from '../TypeDefs/Learner';
import { MessageType } from "../TypeDefs/Messages";
import { LearnerSubjectType } from "../TypeDefs/LearnerSubject";
import { LearnerSubject } from "../../Entities/LearnerSubject";
import { getRepository } from "typeorm";

export const CREATE_LEARNER = {
   type: LearnerType,
   description: 'Creating new learner',
   args: {
      firstName: { type: GraphQLNonNull(GraphQLString) },
      lastName: { type: GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLNonNull(GraphQLString) },
      tokens: { type: GraphQLNonNull(GraphQLInt) },
      gradeId: { type: GraphQLNonNull(GraphQLID) },
   },
   async resolve(parent: any, args: any) {
      const { firstName, lastName, email, tokens, gradeId } = args;
      await getRepository(Learner).createQueryBuilder()
         .insert()
         .into(Learner)
         .values([{ firstName, lastName, email, tokens, gradeId }])
         .execute();

      return args;
   },
}

export const UPDATE_LEARNER = {
   type: MessageType,
   args: {
      id: { type: GraphQLID },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      tokens: { type: GraphQLInt },
      gradeId: { type: GraphQLID },
   },
   async resolve(parent: any, args: any) {
      const { id, firstName, lastName, email, tokens, gradeId } = args;

      await getRepository(Learner).createQueryBuilder()
         .update(Learner)
         .set({ firstName, lastName, email, tokens, gradeId })
         .where('id = :id', { id: id })
         .execute();

      return { successful: true, message: "LEARNER SUCCESSFULLY UPDATED" };
   }
}

export const DELETE_LEARNER = {
   type: MessageType,
   args: {
      id: { type: GraphQLID }
   },
   async resolve(parent: any, args: any) {
      const { id } = args;
      
      await getRepository(Learner).createQueryBuilder()
         .delete()
         .from(Learner)
         .where('id = :id', { id: id })
         .execute();

      return { successful: true, message: "LEARNER SUCCESSFULLY DELETED" };
   }
}

export const CREATE_lEARNER_SUBJECT = {
   type: LearnerSubjectType,
   description: "Add specific subject for a specific learner ",
   args: {
      learnerId: { type: GraphQLID },
      subjectId: { type: GraphQLID },
   },
   async resolve(parent: any, args: any) {
      const { learnerId, subjectId } = args;

      await getRepository(LearnerSubject).createQueryBuilder()
         .insert()
         .into(LearnerSubject)
         .values([{ learnerId, subjectId }])
         .execute();

      return args;
   },
}