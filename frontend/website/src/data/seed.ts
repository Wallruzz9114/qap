import { setTimeout } from 'timers';
import { IAnswer } from '../models/answer';
import { IPost } from '../models/post';
import { IPostAnswer } from '../models/post_answer';
import { IQuestion } from '../models/question';

const questions: IQuestion[] = [
  {
    id: 1,
    title: 'Why should I learn TypeScript?',
    content:
      'TypeScript seems to be getting popular so I wondered whether it is worth my time learning it?' +
      ' What benefits does it give over JavaScript?',
    op: 'Bob',
    created: new Date(),
    answers: [
      {
        id: 1,
        content: 'To catch problems earlier speeding up your developments',
        op: 'Jane',
        created: new Date(),
      },
      {
        id: 2,
        content: 'So, that you can use the JavaScript features of tomorrow, today',
        op: 'Fred',
        created: new Date(),
      },
    ],
  },
  {
    id: 2,
    title: 'Which state management tool should I use?',
    content:
      'There seem to be a fair few state management tools around for React -' +
      ' React, Unstated, ... Which one should I use?',
    op: 'Bob',
    created: new Date(),
    answers: [],
  },
];

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const getUnansweredQuestions = async (): Promise<IQuestion[]> => {
  await wait(500);
  return questions.filter((q) => q.answers.length === 0);
};

const getQuestion = async (id: number): Promise<IQuestion | null> => {
  await wait(500);
  const filteredQuestions = questions.filter((q) => q.id === id);

  return filteredQuestions.length > 0 ? filteredQuestions[0] : null;
};

const searchQuestions = async (criteria: string): Promise<IQuestion[]> => {
  await wait(500);
  return questions.filter(
    (q) =>
      q.title.toLowerCase().indexOf(criteria.toLowerCase()) > 0 ||
      q.content.toLowerCase().indexOf(criteria.toLowerCase()) >= 0
  );
};

export const createPost = async (post: IPost): Promise<IQuestion | undefined> => {
  await wait(500);

  const id = Math.max(...questions.map((q) => q.id)) + 1;
  const newQuestion: IQuestion = {
    ...post,
    id,
    answers: [],
  };

  questions.push(newQuestion);
  return newQuestion;
};

export const answerPost = async (answer: IPostAnswer): Promise<IAnswer | undefined> => {
  await wait(500);
  const question = questions.filter((q) => q.id === answer.questionId)[0];
  const answerInQuestion: IAnswer = {
    id: 99,
    ...answer,
  };
  question.answers.push(answerInQuestion);
  return answerInQuestion;
};

export { getUnansweredQuestions, getQuestion, searchQuestions };
