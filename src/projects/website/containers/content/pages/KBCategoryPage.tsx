import React from 'react';
import { Page } from '~website/containers/content/types';
import { BreadcrumbBar } from '~components/BreadcrumbBar';
import { Link } from 'react-router-dom';
import {Typeface, TypeSize, type} from "~libs/style/type";
import styled from 'react-emotion';

interface IKBRoot extends Page {}

interface IKBContentPage extends Page {}

interface IKBCategoryPage extends Page<IKBContentPage[]> {
  rootPage: IKBRoot;
}

interface KBCategoryPageProps {
  page: IKBCategoryPage;
}

const PageList = styled.ul({
});

const PageLink = styled(Link)({
  textDecoration: 'none',
  fontWeight: 600,
  ...type(TypeSize.BodyCopy, Typeface.Secondary),
});

export const KBCategoryPage: React.SFC<KBCategoryPageProps> = ({ page }) => (
  <div className="LokiContainer">
    <BreadcrumbBar>
      <Link key={page.rootPage.path} to={page.rootPage.path}>
        {page.rootPage.title}
      </Link>
      <Link key={page.path} to={page.path}>
        {page.title}
      </Link>
    </BreadcrumbBar>
    <h1>{page.title}</h1>

    <PageList>
      {page.subPages.map((contentPage) => (
        <li key={contentPage.path}>
          <PageLink to={contentPage.path}>{contentPage.title}</PageLink>
        </li>
      ))}
    </PageList>
  </div>
);
