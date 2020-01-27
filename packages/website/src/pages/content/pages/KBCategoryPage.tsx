import React from 'react';
import { Page } from '../types';
import { BreadcrumbBar } from '../../../components/BreadcrumbBar';
import { Link } from 'react-router-dom';
import { Typeface, TypeSize, type } from '@ussu/basil/src/style/type';

interface KBCategoryPageData extends Page<Page[]> {
  rootPage: Page;
}

export interface KBCategoryPageProps {
  page: KBCategoryPageData;
}

export const KBCategoryPage: React.FC<KBCategoryPageProps> = ({ page }) => (
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

    <ul>
      {page.subPagesGeneric.map((contentPage) => (
        <li key={contentPage.path}>
          <Link
            css={{
              textDecoration: 'none',
              fontWeight: 600,
              ...type(TypeSize.BodyCopy, Typeface.Secondary),
            }}
            to={contentPage.path}
          >
            {contentPage.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
