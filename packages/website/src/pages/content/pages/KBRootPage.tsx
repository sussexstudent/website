import React from 'react';
import { FalmerFile, Page } from '../types';
import { Link } from 'react-router-dom';
import { BreadcrumbBar } from '../../../components/BreadcrumbBar';
import { COLORS, MQ } from '@ussu/basil/src/style';
import { type, Typeface, TypeSize } from '@ussu/basil/src/style/type';
import convert from 'htmr';

interface IKBCatPage extends Page {
  pageIcon: FalmerFile;
}

interface IKBRootPage extends Page {
  categories: IKBCatPage[];
  introduction: string;
}

export interface KBRootPageProps {
  page: IKBRootPage;
}

export const KBRootPage: React.FC<KBRootPageProps> = ({ page }) => (
  <div className="LokiContainer">
    <BreadcrumbBar>
      <Link key={page.path} to={page.path}>
        {page.title}
      </Link>
    </BreadcrumbBar>
    <h1 className="tac">{page.title}</h1>

    <div
      css={{
        maxWidth: 760,
        margin: '1rem auto',
        color: COLORS.GREY_WORST_WINTER,
        textAlign: 'center',
        fontWeight: 600,
        ...type(TypeSize.GreatPrimer, Typeface.Secondary),
      }}
    >
      {convert(page.introduction, {})}
    </div>

    <ul
      css={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      {page.categories.map((category) => (
        <li
          css={{
            width: '50%',
            padding: '1rem',
            boxSizing: 'border-box',

            [MQ.Medium]: {
              width: 180,
            },
          }}
          key={category.path}
        >
          <Link
            css={{
              textDecoration: 'none',
              display: 'block',
              transition: 'transform ease 300ms',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            to={category.path}
          >
            <img
              css={{
                display: 'block',
                maxWidth: '100%',
                width: '100%',
                height: '100%',
                maxHeight: 100,
                objectFit: 'contain',
                marginBottom: '0.8rem',
              }}
              src={category.pageIcon.url}
            />
            <span
              css={{
                display: 'block',
                textAlign: 'center',
                color: COLORS.GREY_SLATE,
                ...type(TypeSize.Pica, Typeface.Secondary),
                fontWeight: 600,
              }}
            >
              {category.title}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
