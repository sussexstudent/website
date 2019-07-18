import React from 'react';
import { InternalAppLink } from '../InternalAppLink';
import { type, Typeface, TypeSize } from '@ussu/common/src/libs/style/type';
import { MenuItem } from '@ussu/common/src/types/skeleton';
import { COLORS } from '@ussu/common/src/libs/style';
import MENU_QUERY from './MenuQuery.graphql';
import { useQuery } from '@apollo/react-hooks';
import { css } from '@emotion/core';

const dropoverStyles = css({
  position: 'absolute',
  left: 0,
  right: 0,
  paddingTop: '1rem',
  paddingBottom: '1rem',
  color: '#fff',
  boxShadow: '0 16px 16px rgba(30, 30, 30, 0.3)',
});

const menuItemColorMap = {
  [MenuItem.GetInvolved]: COLORS.BRAND_BLUE,
  [MenuItem.WhatsOn]: COLORS.BRAND_GREEN,
  [MenuItem.Support]: COLORS.BRAND_RED,
  [MenuItem.AboutUs]: COLORS.GREY_SLATE,
};

const LokiMenuDropover = React.forwardRef<
  HTMLDivElement,
  { isOpen: boolean; currentItem: MenuItem }
>(({ isOpen, currentItem }, ref) => {
  const { data, loading } = useQuery(MENU_QUERY);

  if (
    !data ||
    loading ||
    !data.page ||
    !data.page.subPages ||
    !data.page.subPages.hasOwnProperty(currentItem)
  ) {
    return null;
  }

  const sections = data.page.subPages[currentItem].subPages;

  return (
    <div
      ref={ref}
      css={dropoverStyles}
      style={{
        display: isOpen ? 'block' : 'none',
        backgroundColor: menuItemColorMap[currentItem],
      }}
    >
      <div className="LokiContainer">
        <div
          css={{
            display: 'grid',
            gridGap: 26,
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          }}
        >
          {sections.map((section: any) => (
            <div>
              <InternalAppLink
                css={{
                  color: COLORS.WHITE,
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'block',
                  marginBottom: '0.5rem',

                  ...type(TypeSize.GreatPrimer, Typeface.Secondary),
                }}
                to={section.path}
              >
                {section.title}
              </InternalAppLink>
              {section.subPages.map((sub: any) => (
                <InternalAppLink
                  css={{
                    color: COLORS.WHITE,
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'block',
                    marginBottom: '0.2rem',

                    ...type(TypeSize.Pica, Typeface.Secondary),
                  }}
                  to={sub.path}
                >
                  {sub.title}
                </InternalAppLink>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export { LokiMenuDropover };
