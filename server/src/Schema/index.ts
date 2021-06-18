// DIVIDE INTO 3 PARTS

import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { GET_ALL_USERS, GET_USER } from './Queries/User';
import { GET_ALL_GRADES, GET_GRADE } from './Queries/Grade';
import { GET_ALL_DAYS, GET_DAY } from './Queries/Days';
import { GET_ALL_LEARNERS, GET_LEARNER } from './Queries/Learner';
import { GET_ALL_SUBJECTS, GET_SUBJECT } from './Queries/Subject';
import { GET_ALL_LESSONS, GET_LESSON } from './Queries/Lesson';


import { CREATE_USER, DELETE_USER, UPDATE_PASSWORD } from './Mutations/User';
import { CREATE_GRADE, UPDATE_GRADE, DELETE_GRADE } from './Mutations/Grade';
import { CREATE_DAY, UPDATE_DAY, DELETE_DAY } from './Mutations/Days';
import { CREATE_LEARNER, UPDATE_LEARNER, DELETE_LEARNER } from './Mutations/Learner';
import { CREATE_SUBJECT, UPDATE_SUBJECT, DELETE_SUBJECT } from './Mutations/Subject';
import { CREATE_LESSON, UPDATE_LESSON, DELETE_LESSON } from './Mutations/Lesson';

const RootQuery = new GraphQLObjectType({
   name: "RootQuery",
   fields: {
      getAllUsers: GET_ALL_USERS,
      getUser: GET_USER,
      getAllGrades: GET_ALL_GRADES,
      getGrade: GET_GRADE,
      getAllDays: GET_ALL_DAYS,
      getDay: GET_DAY,
      getAllLearners: GET_ALL_LEARNERS,
      getLearner: GET_LEARNER,
      getAllSubjects: GET_ALL_SUBJECTS,
      getSubject: GET_SUBJECT,
      getAllLessons: GET_ALL_LESSONS,
      getLesson: GET_LESSON
     
   }
});

const Mutation = new GraphQLObjectType({
   name: "Mutation",
   fields: {
      createUser: CREATE_USER,
      deleteUser: DELETE_USER,
      updatePassword: UPDATE_PASSWORD,
      createGrade: CREATE_GRADE,
      updateGrade: UPDATE_GRADE,
      deleteGrade: DELETE_GRADE,
      createDay: CREATE_DAY,
      updateDay: UPDATE_DAY,
      deleteDay: DELETE_DAY,
      createLeaner: CREATE_LEARNER,
      updateLearner: UPDATE_LEARNER,
      deleteLearner: DELETE_LEARNER,
      createSubject: CREATE_SUBJECT,
      updateSubject: UPDATE_SUBJECT,
      deleteSubject: DELETE_SUBJECT,
      createLesson: CREATE_LESSON,
      updateLesson: UPDATE_LESSON,
      deleteLesson: DELETE_LESSON,

   }
});


export const schema = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
});

