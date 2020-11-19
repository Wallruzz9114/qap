/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from '@emotion/react';
import { IAnswer } from '../models/answer';
import { gray5 } from '../utils/styles';
import Answer from './Answer';

interface IProps {
  answers: IAnswer[];
}

const AnswersList: React.FC<IProps> = ({ answers }) => (
  <ul
    css={css`
      list-style: none;
      margin: 10px 0 0 0;
      padding: 0;
    `}
  >
    {answers.map((answer) => (
      <li
        css={css`
          border-top: 1px solid ${gray5};
        `}
        key={answer.id}
      >
        <Answer answer={answer} />
      </li>
    ))}
  </ul>
);

export { AnswersList };
