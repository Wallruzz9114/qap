/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Page } from '../components/Page';
import { QuestionsList } from '../components/QuestionsList';
import { searchQuestions } from '../data/seed';
import { IQuestion } from '../models/question';

const SearchPage: React.FC<RouteComponentProps> = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const searchParameters = new URLSearchParams(location.search);
  const searchCriteria = searchParameters.get('criteria') || '';

  useEffect(() => {
    const search = async (criteria: string) => {
      const questionSearchResults = await searchQuestions(criteria);
      setQuestions(questionSearchResults);
    };

    search(searchCriteria);
  }),
    [searchCriteria];

  return (
    <Page title="Search Results">
      {searchCriteria && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{searchCriteria}"
        </p>
      )}
      <QuestionsList questions={questions} />
    </Page>
  );
};

export default SearchPage;
