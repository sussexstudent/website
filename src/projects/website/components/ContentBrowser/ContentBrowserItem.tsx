import React from 'react';
import { ContentBrowserPage } from '~website/containers/content/types';
import { InternalAppLink } from '~components/InternalAppLink';
import { COLORS } from '~libs/style';
import styled from '@emotion/styled';
import { css, cx } from 'emotion';
import { type, Typeface, TypeSize } from '~libs/style/type';

export const Item = styled.li({
  display: 'block',
});

export const itemActive = css();

const linkActive = css({
  backgroundColor: COLORS.WHITE,
  borderRadius: 2,
});

const Link = styled(InternalAppLink)({
  display: 'block',
  padding: '1rem',
  marginBottom: '1rem',
  backgroundColor: COLORS.GREY_SUMMER,
  textDecoration: 'none',
});

const PageTitle = styled.div({
  ...type(TypeSize.DoublePica, Typeface.Secondary),
  fontWeight: 600,
});

const PageDescription = styled.div({
  ...type(TypeSize.BodyCopy, Typeface.Primary),
});

export const ContentBrowserItem: React.FC<{
  page: ContentBrowserPage;
  isActive: boolean;
}> = ({ page: { path, contentType, title }, isActive }) => (
  <Item className={cx({ [linkActive]: isActive })}>
    <Link
      to={contentType === 'StubPage' ? `/browse${path}` : path}
      className={cx({ [linkActive]: isActive })}
    >
      <PageTitle>{title}</PageTitle>
      <PageDescription className="ContentBrowser__page-description" />
    </Link>
  </Item>
);
