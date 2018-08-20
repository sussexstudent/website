import React from 'react';
import { Page } from '~website/containers/content/types';
import { Link } from '@reach/router';
import { BreadcrumbBar } from '~components/BreadcrumbBar';

interface IKBCatPage extends Page {}

interface IKBRootPage extends Page {
  categories: IKBCatPage[];
}

interface KBRootPageProps {
  page: IKBRootPage;
}

export const KBRootPage: React.SFC<KBRootPageProps> = ({ page }) => (
  <div className="LokiContainer">
    <BreadcrumbBar>
      <Link key={page.path} to={page.path}>
        {page.title}
      </Link>
    </BreadcrumbBar>
    <h1>{page.title}</h1>

    <ul>
      {page.categories.map((category) => (
        <li key={category.path}>
          <Link to={category.path}>{category.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);
