import React from 'react';
import styled from '@emotion/styled';
import { InternalAppLink } from '~components/InternalAppLink';
import { type, Typeface, TypeSize } from '~libs/style/type';
import { css } from 'emotion';
import { MenuItem } from '~types/skeleton';
import { COLORS } from '~libs/style';
import MENU_QUERY from './MenuQuery.graphql';
import { useQuery } from 'react-apollo-hooks';

const dropoverStyles = css({
  position: 'absolute',
  left: 0,
  right: 0,
  paddingTop: '1rem',
  paddingBottom: '1rem',
  color: '#fff',
  boxShadow: '0 16px 16px rgba(30, 30, 30, 0.3)',
});

const Items = styled.div({
  display: 'grid',
  gridGap: 26,
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
});

const Section = styled.div({});

const SectionHeader = styled(InternalAppLink)({
  color: COLORS.WHITE,
  fontWeight: 600,
  textDecoration: 'none',
  display: 'block',
  marginBottom: '0.5rem',

  ...type(TypeSize.GreatPrimer, Typeface.Secondary),
});

const SectionSubItem = styled(InternalAppLink)({
  color: COLORS.WHITE,
  fontWeight: 600,
  textDecoration: 'none',
  display: 'block',
  marginBottom: '0.2rem',

  ...type(TypeSize.Pica, Typeface.Secondary),
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

  if (!data || loading) {
    return null;
  }

  const sections = data.page.subPages[currentItem].subPages;

  return (
    <div
      ref={ref}
      className={dropoverStyles}
      style={{
        display: isOpen ? 'block' : 'none',
        backgroundColor: menuItemColorMap[currentItem],
      }}
    >
      <div className="LokiContainer">
        <Items>
          {sections.map((section: any) => (
            <Section>
              <SectionHeader to={section.path}>{section.title}</SectionHeader>
              {section.subPages.map((sub: any) => (
                <SectionSubItem to={sub.path}>{sub.title}</SectionSubItem>
              ))}
            </Section>
          ))}
        </Items>
      </div>
    </div>
  );
});

export { LokiMenuDropover };
