import React from 'react';
import { ContentBrowserPage } from '~website/containers/content/types';
import { InternalAppLink } from '~components/InternalAppLink';
import { COLORS } from '~libs/style';
import styled, { css, cx } from 'react-emotion';
import { type, Typeface, TypeSize } from '~libs/style/type';
import { Column } from '~website/components/ContentBrowser/ContentBrowserColumn';

const Item = styled('li')({
  display: 'block',
  [`${Column}--active &`]: css({
    opacity: 0.6,
  }),
});

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

const PageTitle = styled('div')({
  ...type(TypeSize.DoublePica, Typeface.Secondary),
  fontWeight: 600,
});

const PageDescription = styled('div')({
  ...type(TypeSize.BodyCopy, Typeface.Primary),
});

export const ContentBrowserItem: React.SFC<{
  page: ContentBrowserPage;
  isActive: boolean;
}> = ({ page: { path, contentType, title }, isActive }) => (
  <Item>
    <Link
      to={contentType === 'StubPage' ? `/browse${path}` : path}
      className={cx({ [linkActive]: isActive })}
    >
      <PageTitle>{title}</PageTitle>
      <PageDescription className="ContentBrowser__page-description" />
    </Link>
  </Item>
);
