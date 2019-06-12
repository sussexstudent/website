import React from 'react';
import { ContentBrowserPage } from '../../containers/content/types';
import { InternalAppLink } from '../InternalAppLink';
import { COLORS } from '@ussu/common/src/libs/style';
import { type, Typeface, TypeSize } from '@ussu/common/src/libs/style/type';
import { css } from '@emotion/core';

export const itemActive = css();

const linkActive = css({
  backgroundColor: COLORS.WHITE,
  borderRadius: 2,
});

export const ContentBrowserItem: React.FC<{
  page: ContentBrowserPage;
  isActive: boolean;
}> = ({ page: { path, contentType, title }, isActive }) => (
  <li
    css={css({
      display: 'block',
      ...(isActive ? null : linkActive),
    })}
  >
    <InternalAppLink
      css={css({
        display: 'block',
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: COLORS.GREY_SUMMER,
        textDecoration: 'none',
        ...(isActive ? null : linkActive),
      })}
      to={contentType === 'StubPage' ? `/browse${path}` : path}
    >
      <div
        css={css({
          ...type(TypeSize.DoublePica, Typeface.Secondary),
          fontWeight: 600,
        })}
      >
        {title}
      </div>
      <div
        css={css({
          ...type(TypeSize.BodyCopy, Typeface.Primary),
        })}
        className="ContentBrowser__page-description"
      />
    </InternalAppLink>
  </li>
);
