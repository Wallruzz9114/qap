/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from '@emotion/react';
import { IAnswer } from '../models/answer';
import { gray3 } from '../utils/styles';

interface IProps {
  answer: IAnswer;
}

const Answer: React.FC<IProps> = ({ answer }) => (
  <div
    css={css`
      padding: 10px 0px;
    `}
  >
    <div
      css={css`
        padding: 10px 0px;
        font-size: 13px;
      `}
    >
      {answer.content}
    </div>
    <div
      css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
      `}
    >
      {`Answered by ${
        answer.poster
      } on ${answer.created.toLocaleDateString()} ${answer.created.toLocaleTimeString()}`}
    </div>
  </div>
);

export default Answer;
