/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from '@emotion/react';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { HeaderWithRouter as Header } from './components/Header';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import QuestionPage from './pages/QuestionPage';
import SearchPage from './pages/SearchPage';
import SignInPage from './pages/SignInPage';
import { fontFamily, fontSize, gray2 } from './utils/styles';

const AskPage = lazy(() => import('./pages/AskPage'));

const App: React.FC = () => (
  <BrowserRouter>
    <div
      css={css`
        font-family: ${fontFamily};
        font-size: ${fontSize};
        color: ${gray2};
      `}
    >
      <Header />
      <Switch>
        <Redirect from="/home" to="/" />
        <Route exact path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/ask">
          <Suspense
            fallback={
              <div
                css={css`
                  margin-top: 100px;
                  text-align: center;
                `}
              >
                Loading...
              </div>
            }
          >
            <AskPage />
          </Suspense>
        </Route>
        <Route path="/signin" component={SignInPage} />
        <Route path="/questions/:id" component={QuestionPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
