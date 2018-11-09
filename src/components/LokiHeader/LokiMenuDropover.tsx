import React from 'react';
import styled from 'react-emotion';
import {COLORS} from "~libs/style";
import {InternalAppLink} from "~components/InternalAppLink";
import {type, Typeface, TypeSize} from '~libs/style/type';

const Dropover = styled.div({
  position: 'absolute',
  left: 0,
  right: 0,
  paddingTop: '1rem',
  paddingBottom: '1rem',
  background: COLORS.BRAND_GREEN,
  color: '#fff',
  boxShadow: '0 16px 16px rgba(30, 30, 30, 0.3)',
});

const Items = styled.div({
  display: 'grid',
  gridGap: 26,
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
});


const Section = styled.div({

});

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

const LokiMenuDropover = () => {

  return (
    <Dropover>
      <div className="LokiContainer">
        <Items>
          <Section>
            <SectionHeader to="/get-involved/societies-student-media">Societies, student media & sports</SectionHeader>
            <SectionSubItem to="/get-involved/societies-student-media/discover">Find and discover groups</SectionSubItem>
            <SectionSubItem to="/get-involved/societies-student-media/yours">Your groups</SectionSubItem>
            <SectionSubItem to="/get-involved/societies-student-media/guides">Guides for committees</SectionSubItem>
            <SectionSubItem to="/get-involved/societies-student-media/guides">ActiveUS</SectionSubItem>
          </Section>
          <Section>
            <SectionHeader to="/get-involved/volunteering">Campaigns & Volunteering</SectionHeader>
            <SectionSubItem to="/get-involved/volunteering/good-night-owls">Good Night Owls</SectionSubItem>
            <SectionSubItem to="/get-involved/volunteering/good-night-owls">Role Models Project</SectionSubItem>
            <SectionSubItem to="/get-involved/volunteering/good-night-owls">Students' Union Ambassador</SectionSubItem>
            <SectionSubItem to="/get-involved/volunteering/good-night-owls">Language Café</SectionSubItem>
          </Section>
          <Section>
            <SectionHeader to="/get-involved/volunteering">Democracy</SectionHeader>
            <SectionSubItem to="/get-involved/volunteering/good-night-owls">Vote</SectionSubItem>
            <SectionSubItem to="/get-involved/volunteering/good-night-owls">Hold an elected position</SectionSubItem>
            <SectionSubItem to="/get-involved/volunteering/good-night-owls">Your elected officers</SectionSubItem>
          </Section>
          <Section>
            <SectionHeader to="/get-involved/volunteering">Volunteering</SectionHeader>
            <SectionSubItem to="/get-involved/volunteering/good-night-owls">Good Night Owls</SectionSubItem>
            <SectionSubItem to="/get-involved/volunteering/good-night-owls">Good Night Owls</SectionSubItem>
            <SectionSubItem to="/get-involved/volunteering/good-night-owls">Good Night Owls</SectionSubItem>
            <SectionSubItem to="/get-involved/volunteering/good-night-owls">Good Night Owls</SectionSubItem>
          </Section>
          <Section>
            <SectionHeader to="/get-involved/volunteering">Volunteering</SectionHeader>
            <SectionSubItem to="/get-involved/volunteering/good-night-owls">Good Night Owls</SectionSubItem>
            <SectionSubItem to="/get-involved/volunteering/good-night-owls">Good Night Owls</SectionSubItem>
            <SectionSubItem to="/get-involved/volunteering/good-night-owls">Good Night Owls</SectionSubItem>
            <SectionSubItem to="/get-involved/volunteering/good-night-owls">Good Night Owls</SectionSubItem>
          </Section>
        </Items>
      </div>
    </Dropover>
  );
};

export { LokiMenuDropover };
