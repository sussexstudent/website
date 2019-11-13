import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS, MQ, TYPE_SECONDARY } from '@ussu/basil/src/style';

export const SectionbarItem: React.FC<{
  active?: boolean;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLLIElement>> = ({ children, active, disabled }) => (
  <li
    css={{
      display: 'flex',
      alignItems: 'center',
      flex: '0 0 auto',

      '& &--disabled': {
        '& > a, & > button': {
          color: COLORS.GREY_WINTER,
          fontWeight: 'normal',
          cursor: 'default',
        },
      },

      opacity: disabled ? 0.6 : 1,

      '& > a, & > button, & > span': {
        fontFamily: TYPE_SECONDARY,
        color: active ? COLORS.BRAND_BLUE : COLORS.GREY_SLATE,
        textDecoration: 'none',
        fontWeight: 600,
        padding: '0 0.6rem',

        '&.active': {
          color: COLORS.BRAND_BLUE,
        },
      },
    }}
  >
    {children}
  </li>
);

interface SectionbarProps {
  title: string;
  titleLink?: string;
}

export const Sectionbar: React.FC<SectionbarProps> = (props) => {
  return (
    <div
      css={{
        fontFamily: TYPE_SECONDARY,
        padding: '0.6rem 0 0.3rem',
        marginBottom: '1rem',
        background: COLORS.GREY_SUMMER,
        borderBottom: `1px solid ${COLORS.GREY_SPRING}`,
        marginTop: '-1rem',
      }}
    >
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          [MQ.Medium]: {
            flexDirection: 'row',
          },
        }}
        className="LokiContainer"
      >
        <h2
          css={{
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
          }}
        >
          {props.titleLink ? (
            <Link to={props.titleLink}>{props.title}</Link>
          ) : (
            props.title
          )}
        </h2>
        <div
          css={{
            display: 'flex',
            ':after': {
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '30px',
              background: 'green',
            },
          }}
        >
          <ul
            css={{
              padding: 0,
              margin: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'row',
              overflow: 'auto',
              paddingBottom: '10px',
            }}
          >
            {props.children}
          </ul>
        </div>
      </div>
    </div>
  );
};
