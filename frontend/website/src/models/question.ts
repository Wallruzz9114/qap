import { IAnswer } from './answer';

export interface IQuestion {
  id: number;
  title: string;
  content: string;
  op: string;
  created: Date;
  answers: IAnswer[];
}
