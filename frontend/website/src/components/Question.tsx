/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from '@emotion/react';
import { Link } from 'react-router-dom';
import { IQuestion } from '../models/question';
import { gray2, gray3 } from '../utils/styles';

interface IProps {
  question: IQuestion;
  showContent?: boolean;
}

const Question: React.FC<IProps> = ({ question, showContent = true }) => (
  <div
    css={css`
      padding: 10px 0px;
    `}
  >
    <Link
      css={css`
        text-decoration: none;
        color: ${gray2};
      `}
      to={`questions/${question.id}`}
    >
      {question.title}
    </Link>
    {showContent && (
      <div
        css={css`
          padding-bottom: 10px;
          font-size: 15px;
          color: ${gray2};
        `}
      >
        {question.content.length > 50
          ? `${question.content.substring(0, 50)}...`
          : question.content}
      </div>
    )}
    <div
      css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
      `}
    >
      {`Asked by ${
        question.op
      } on ${question.created.toLocaleDateString()} ${question.created.toLocaleTimeString()}`}
    </div>
  </div>
);

export default Question;
