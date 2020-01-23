import React from 'react';
import { COLORS } from '@ussu/basil/src/style';
import { flatten } from 'lodash';
import { type, Typeface, TypeSize } from '@ussu/basil/src/style/type';
import { InternalAppLink } from '../InternalAppLink';

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
        flexWrap: 'wrap',
        display: 'flex',
        '.feature-touch &': {
          flexWrap: 'nowrap',
        },
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
        { marginTop: '-1rem', marginBottom: '1rem' },
        type(TypeSize.Pica, Typeface.Secondary),
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
  if (!Array.isArray(children) || children.length <= 0) {
    return null;
  }

  return (
    <div
      css={{
        background: COLORS.GREY_SPRING,
      }}
    >
      <div className="LokiContainer" css={{ display: 'flex' }}>
        <InternalAppLink
          css={[
            {
              display: 'inline-block',
              fontWeight: 600,
              color: COLORS.GREY_SAD_SLATE,
              textDecoration: 'none',
              padding: '0.4rem 0.8rem',
            },
          ]}
          to={to}
        >
          {title} ›
        </InternalAppLink>

        <Menu>
          {children &&
            Array.isArray(children) &&
            flatten(children).map((item: any) =>
              item ? (
                <li key={item.props.to} css={{ flex: 'none', display: 'flex' }}>
                  <InternalAppLink
                    nav
                    css={[
                      {
                        display: 'inline-block',
                        fontWeight: 600,
                        color: COLORS.GREY_SLATE,
                        textDecoration: 'none',
                        padding: '0.4em 0.8em',
                      },
                    ]}
                    to={item.props.to}
                    activeStyle={{
                      color: '#fff',
                      background: 'rgb(108, 111, 127)',
                    }}
                  >
                    {item.props.children}
                  </InternalAppLink>
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
}) => {
  return (
    <div
      css={{
        color: '#fff',
        fontWeight: 600,
        padding: '0.2rem 0',
        background: 'rgb(108, 111, 127)',
      }}
    >
      <div className="LokiContainerDeconstructed">
        <div
          css={{
            width: '100%',
            display: 'flex',
            webkitOverflowScrolling: 'touch',
            '.feature-touch &': {
              overflowX: 'scroll',
            },
          }}
        >
          <div
            css={{
              flex: 'auto',
              padding: '0 1rem',
              display: 'flex',
              boxSizing: 'border-box',
              '.feature-touch &': {
                flex: 'none',
                padding: '0 1rem',
              },
            }}
          >
            <Menu>
              {children &&
                Array.isArray(children) &&
                flatten(children).map((item: any) =>
                  item ? (
                    <li
                      key={item.props.to}
                      css={{ flex: 'none', display: 'block' }}
                    >
                      <InternalAppLink
                        nav
                        css={[
                          {
                            padding: '0 0.4rem',
                            textDecoration: 'none',
                            color: '#fff',
                          },
                        ]}
                        to={item.props.to}
                        activeStyle={{
                          textDecoration: 'underline',
                        }}
                      >
                        {item.props.children}
                      </InternalAppLink>
                    </li>
                  ) : null,
                )}
            </Menu>
          </div>
        </div>
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
        <InternalAppLink
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
        </InternalAppLink>

        <Menu>
          {children &&
            Array.isArray(children) &&
            flatten(children).map((item: any) => {
              return item ? (
                <li key={item.props.to} css={{ display: 'inline' }}>
                  <InternalAppLink
                    css={{
                      padding: '0 0.4rem',
                      textDecoration: 'none',
                      color: COLORS.GREY_WORST_WINTER,
                    }}
                    to={item.props.to}
                  >
                    {item.props.children}
                  </InternalAppLink>
                </li>
              ) : null;
            })}
        </Menu>
      </div>
    </div>
  );
};
