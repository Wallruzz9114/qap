/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from '@emotion/react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Page } from '../components/Page';
import { PageTile } from '../components/PageTile';
import { QuestionsList } from '../components/QuestionsList';
import { IQuestion } from '../models/question';
import { AppState, getUnansweredQuestionsActionCreator } from '../store';
import { PrimaryButton } from '../utils/styles';

interface IProps extends RouteComponentProps {
  getUnansweredQuestions: () => Promise<void>;
  questions: IQuestion[] | null;
  questionsLoading: boolean;
}

const mapStateToProps = (store: AppState) => {
  return {
    questions: store.questions.unanswered,
    questionsLoading: store.questions.loading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getUnansweredQuestions: () => dispatch(getUnansweredQuestionsActionCreator()),
  };
};

const HomePage: React.FC<IProps> = ({
  history,
  questions,
  questionsLoading,
  getUnansweredQuestions,
}) => {
  useEffect(() => {
    if (questions === null) {
      getUnansweredQuestions();
    }
  }, [questions, getUnansweredQuestions]);

  const goToSubmitQuestion = () => {
    history.push('/ask');
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
        <PrimaryButton onClick={goToSubmitQuestion}>Ask a question</PrimaryButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
