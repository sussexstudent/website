import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS, MQ, TYPE_SECONDARY } from '~libs/style';
import styled from 'react-emotion';

export const SectionbarItem = styled('li')({
  display: 'flex',
  alignItems: 'center',

  '& &--disabled': {
    '& > a, & > button': {
      color: COLORS.GREY_WINTER,
      fontWeight: 'normal',
      cursor: 'default',
    },
  },

  '& > a, & > button': {
    fontFamily: TYPE_SECONDARY,
    color: COLORS.GREY_SLATE,
    textDecoration: 'none',
    fontWeight: 600,
    padding: '0.2rem',

    [MQ.Medium]: {
      padding: '0 0.5rem',
    },

    '&.active': {
      color: COLORS.BRAND_BLUE,
    },
  },
});

interface SectionbarProps {
  title: string;
  titleLink?: string;
}

const Root = styled('div')({
  fontFamily: TYPE_SECONDARY,
  padding: '0.6rem 0 0.3rem',
  marginBottom: '1rem',
  background: COLORS.GREY_SUMMER,
  borderBottom: `1px solid ${COLORS.GREY_SPRING}`,
  marginTop: '-1rem',
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  [MQ.Medium]: {
    flexDirection: 'row',
  },
});

const Title = styled('h2')({
  margin: '0 1rem 0 0',
  color: COLORS.GREY_SAD_SLATE,
  textAlign: 'center',
  [MQ.Medium]: {
    textAlign: 'left',
  },
  '& a': {
    textDecoration: 'none',
    color: COLORS.GREY_SAD_SLATE,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const Menu = styled('ul')({
  display: 'flex',
  padding: 0,
  margin: 0,
  listStyle: 'none',
  flexDirection: 'column',
  [MQ.Medium]: {
    flexDirection: 'row',
  },
});

export const Sectionbar: React.SFC<SectionbarProps> = (props) => {
  return (
    <Root>
      <Container className="LokiContainer">
        <Title>
          {props.titleLink ? (
            <Link to={props.titleLink}>{props.title}</Link>
          ) : (
            props.title
          )}
        </Title>
        <Menu>{props.children}</Menu>
      </Container>
    </Root>
  );
};
