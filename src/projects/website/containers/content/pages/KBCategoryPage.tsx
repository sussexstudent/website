import React from 'react';
import {Page} from "~website/containers/content/types";
import {BreadcrumbBar} from '~components/BreadcrumbBar';
import {Link} from '@reach/router';

interface IKBRoot extends Page {}

interface IKBContentPage extends Page {}

interface IKBCategoryPage extends Page<IKBContentPage[]> {
  rootPage: IKBRoot;
}

interface KBCategoryPageProps {
  page: IKBCategoryPage;
}

export const KBCategoryPage: React.SFC<KBCategoryPageProps> = ({ page }) => (
  <div className="LokiContainer">
    <BreadcrumbBar>
      <Link key={page.rootPage.path} to={page.rootPage.path}>{page.rootPage.title}</Link>
      <Link key={page.path} to={page.path}>{page.title}</Link>
    </BreadcrumbBar>
    <h1>{page.title}</h1>

    <ul>
      {page.subPages.map(contentPage => (
        <li key={contentPage.path}><Link to={contentPage.path}>{contentPage.title}</Link></li>
      ))}
    </ul>
  </div>
);
