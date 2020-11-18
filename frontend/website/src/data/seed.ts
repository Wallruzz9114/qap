import { setTimeout } from 'timers';
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
        poster: 'Jane',
        created: new Date(),
      },
      {
        id: 2,
        content: 'So, that you can use the JavaScript features of tomorrow, today',
        poster: 'Fred',
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

export { getUnansweredQuestions };
