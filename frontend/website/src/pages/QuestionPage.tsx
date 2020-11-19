/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from '@emotion/react';
import { Fragment, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AnswersList from '../components/AnswersList';
import Page from '../components/Page';
import { getQuestion } from '../data/seed';
import { IQuestion } from '../models/question';
import { gray3, gray6 } from '../utils/styles';

interface IProps {
  id: string;
}

const QuestionPage: React.FC<RouteComponentProps<IProps>> = ({ match }) => {
  const [question, setQuestion] = useState<IQuestion | null>(null);

  useEffect(() => {
    const grabQuestion = async (id: number) => {
      const foundQuestion = await getQuestion(id);
      setQuestion(foundQuestion);
    };

    if (match.params.id) {
      const questionId = Number(match.params.id);
      grabQuestion(questionId);
    }
  }, [match.params.id]);

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question === null ? '' : question.title}
        </div>
        {question !== null && (
          <Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
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
              <AnswersList answers={question.answers} />
            </div>
          </Fragment>
        )}
      </div>
    </Page>
  );
};

export default QuestionPage;
