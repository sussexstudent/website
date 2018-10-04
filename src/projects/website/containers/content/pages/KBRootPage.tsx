import React from 'react';
import { FalmerFile, Page } from '~website/containers/content/types';
import { Link } from 'react-router-dom';
import { BreadcrumbBar } from '~components/BreadcrumbBar';
import styled from 'react-emotion';
import { COLORS, MQ } from '~libs/style';
import { type, Typeface, TypeSize } from '~libs/style/type';
import convert from 'htmr';

interface IKBCatPage extends Page {
  pageIcon: FalmerFile;
}

interface IKBRootPage extends Page {
  categories: IKBCatPage[];
  introduction: string;
}

interface KBRootPageProps {
  page: IKBRootPage;
}

const CategoryList = styled.ul({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
});

const CategoryItem = styled.li({
  width: '50%',
  padding: '1rem',
  boxSizing: 'border-box',

  [MQ.Medium]: {
    width: 180,
  },
});

const CategoryIcon = styled.img({
  display: 'block',
  maxWidth: '100%',
  width: '100%',
  height: '100%',
  maxHeight: 100,
  objectFit: 'contain',
  marginBottom: '0.8rem',
});

const CategoryLink = styled(Link)({
  textDecoration: 'none',
  display: 'block',
  transition: 'transform ease 300ms',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const CategoryTitle = styled.span({
  display: 'block',
  textAlign: 'center',
  color: COLORS.GREY_SLATE,
  ...type(TypeSize.Pica, Typeface.Secondary),
  fontWeight: 600,
});

const Introduction = styled.div({
  maxWidth: 760,
  margin: '1rem auto',
  color: COLORS.GREY_WORST_WINTER,
  textAlign: 'center',
  fontWeight: 600,
  ...type(TypeSize.GreatPrimer, Typeface.Secondary),
});

export const KBRootPage: React.SFC<KBRootPageProps> = ({ page }) => (
  <div className="LokiContainer">
    <BreadcrumbBar>
      <Link key={page.path} to={page.path}>
        {page.title}
      </Link>
    </BreadcrumbBar>
    <h1 className="tac">{page.title}</h1>

    <Introduction>{convert(page.introduction)}</Introduction>

    <CategoryList>
      {page.categories.map((category) => (
        <CategoryItem key={category.path}>
          <CategoryLink to={category.path}>
            <CategoryIcon src={category.pageIcon.url} />
            <CategoryTitle>{category.title}</CategoryTitle>
          </CategoryLink>
        </CategoryItem>
      ))}
    </CategoryList>
  </div>
);
