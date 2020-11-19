/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from '@emotion/react';
import { PageTile } from './PageTile';

interface IProps {
  title?: string;
}

const Page: React.FC<IProps> = ({ title, children }) => (
  <div
    css={css`
      margin: 50px auto 20px auto;
      padding: 30px 20px;
      max-width: 600px;
    `}
  >
    {title && <PageTile>{title}</PageTile>}
    {children}
  </div>
);

export { Page };
