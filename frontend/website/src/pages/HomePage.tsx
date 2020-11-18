/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import Page from '../components/Page';
import { PageTile } from '../components/PageTile';
import { QuestionsList } from '../components/QuestionsList';
import { getUnansweredQuestions } from '../data/seed';
import { IQuestion } from '../models/question';
import { PrimaryButton } from '../utils/styles';

const HomePage = () => {
  const [questions, setQuestions] = useState<IQuestion[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  useEffect(() => {
    const getAllUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };

    getAllUnansweredQuestions();
  }, []);

  const submitQuestion = () => {
    console.log('TODO - move to the AskPage');
  };

  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <PageTile>Unanswered Questions</PageTile>
        <PrimaryButton onClick={submitQuestion}>Ask a question</PrimaryButton>
      </div>
      {questionsLoading ? (
        <div
          css={css`
            font-size: 16px;
            font-style: italic;
          `}
        >
          Loading...
        </div>
      ) : (
        <QuestionsList questions={questions || []} />
      )}
    </Page>
  );
};

export default HomePage;