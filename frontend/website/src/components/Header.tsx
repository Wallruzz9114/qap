/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from '@emotion/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { fontFamily, fontSize, gray1, gray2, gray5 } from '../utils/styles';
import UserIcon from './UserIcon';

const Header: React.FC<RouteComponentProps> = ({ history, location }) => {
  const searchParams = new URLSearchParams(location.search);
  const criteria = searchParams.get('criteria') || '';
  const [search, setSearch] = useState(criteria);

  const searchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/search?criteria=${search}`);
  };

  return (
    <div
      css={css`
        position: fixed;
        box-sizing: border-box;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        background-color: #fff;
        border-bottom: 1px solid ${gray5};
        box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
      `}
    >
      <Link
        to="/"
        css={css`
          font-size: 24px;
          font-weight: bold;
          color: ${gray1};
          text-decoration: none;
        `}
      >
        QAP
      </Link>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={searchInputChange}
          css={css`
            box-sizing: border-box;
            font-family: ${fontFamily};
            font-size: ${fontSize};
            padding: 8px 10px;
            border: 1px solid ${gray5};
            border-radius: 3px;
            color: ${gray2};
            background-color: white;
            width: 200px;
            height: 30px;
            :focus {
              outline-color: ${gray5};
            }
          `}
        />
      </form>
      <Link
        to="./signin"
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          padding: 5px 10px;
          background-color: transparent;
          color: ${gray2};
          text-decoration: none;
          cursor: pointer;
          span {
            margin-left: 10px;
          }
          :focus {
            outline-color: ${gray5};
          }
        `}
      >
        <UserIcon />
        <span>Sign In</span>
      </Link>
    </div>
  );
};

const HeaderWithRouter = withRouter(Header);

export { HeaderWithRouter };
