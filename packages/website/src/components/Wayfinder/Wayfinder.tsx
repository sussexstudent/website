import React from 'react';
import { COLORS } from '@ussu/basil/src/style';
import { Link, NavLink } from 'react-router-dom';
import { flatten } from 'lodash';
import { type, Typeface, TypeSize } from '@ussu/basil/src/style/type';

const Menu: React.FC<React.HTMLProps<HTMLUListElement>> = ({
  children,
  ...props
}) => {
  return (
    <ul
      css={{
        padding: 0,
        margin: 0,
        listStyle: 'none',
        display: 'inline',
      }}
      {...props}
    >
      {children}
    </ul>
  );
};

export const Wayfinder: React.FC = ({ children }) => {
  return (
    <div
      css={[
        type(TypeSize.Pica, Typeface.Secondary),
        { marginTop: '-1rem', marginBottom: '1rem' },
      ]}
    >
      {children}
    </div>
  );
};

export const WayfinderItem: React.FC<{ to: string }> = () => null;

export const WayfinderTopLevel: React.FC<{ title: string; to: string }> = ({
  children,
  title,
  to,
}) => {
  return (
    <div
      css={{
        background: COLORS.GREY_SPRING,
        fontSize: '1.1em',
      }}
    >
      <div className="LokiContainer">
        <Link
          css={[
            {
              display: 'inline-block',
              fontWeight: 600,
              color: COLORS.GREY_SAD_SLATE,
              textDecoration: 'none',
              padding: '0.3rem 1rem 0.3rem 0',
              fontSize: '1.3rem',
            },
          ]}
          to={to}
        >
          {title}
        </Link>

        <Menu>
          {children &&
            Array.isArray(children) &&
            flatten(children).map((item: any) =>
              item ? (
                <li key={item.props.to} css={{ display: 'inline' }}>
                  <NavLink
                    css={[
                      {
                        display: 'inline-block',
                        padding: '0.4rem 0.8rem',
                        fontWeight: 600,
                        color: COLORS.GREY_SLATE,
                        textDecoration: 'none',
                      },
                    ]}
                    to={item.props.to}
                    activeStyle={{
                      color: '#fff',
                      background: 'rgb(108, 111, 127)',
                    }}
                  >
                    {item.props.children}
                  </NavLink>
                </li>
              ) : null,
            )}
        </Menu>
      </div>
    </div>
  );
};

export const WayfinderSecondLevel: React.FC<{ title: string; to: string }> = ({
  children,
  title,
  to,
}) => {
  return (
    <div
      css={{
        background: COLORS.GREY_SUMMER,
        color: '#fff',
        fontWeight: 600,
        padding: '0.2rem 0',
      }}
    >
      <div className="LokiContainer">
        <Link
          css={{
            display: 'inline-blokc',
            paddingRight: '1rem',
            color: '#27363E',
            textDecoration: 'none',
            paddingTop: '0.4rem',
            paddingBottom: '0.4rem',
          }}
          to={to}
        >
          {title} ›
        </Link>

        <Menu>
          {children &&
            Array.isArray(children) &&
            flatten(children).map((item: any) =>
              item ? (
                <li key={item.props.to} css={{ display: 'inline' }}>
                  <NavLink
                    css={[
                      {
                        padding: '0 0.4rem',
                        textDecoration: 'none',
                        color: '#27363E',
                      },
                    ]}
                    to={item.props.to}
                    activeStyle={{
                      borderBottom: '2px solid #fff',
                    }}
                  >
                    {item.props.children}
                  </NavLink>
                </li>
              ) : null,
            )}
        </Menu>
      </div>
    </div>
  );
};

export const WayfinderThirdLevel: React.FC<{ title: string; to: string }> = ({
  children,
  title,
  to,
}) => {
  return (
    <div
      css={{
        color: COLORS.GREY_SLATE,
        fontWeight: 500,
        padding: '0.2rem 0',
      }}
    >
      <div className="LokiContainer">
        <Link
          css={{
            display: 'inline-block',
            paddingRight: '1rem',
            textDecoration: 'none',
            color: '#27363E',
            paddingTop: '0.4rem',
            paddingBottom: '0.4rem',
          }}
          to={to}
        >
          {title} ›
        </Link>

        <Menu>
          {children &&
            Array.isArray(children) &&
            flatten(children).map((item: any) => {
              return item ? (
                <li key={item.props.to} css={{ display: 'inline' }}>
                  <Link
                    css={{
                      padding: '0 0.4rem',
                      textDecoration: 'none',
                      color: COLORS.GREY_WORST_WINTER,
                    }}
                    to={item.props.to}
                  >
                    {item.props.children}
                  </Link>
                </li>
              ) : null;
            })}
        </Menu>
      </div>
    </div>
  );
};
