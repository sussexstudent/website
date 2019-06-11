import React from 'react';
import { compact, omit } from 'lodash';
import ChevronForwardIcon from '@ussu/common/src/icons/chevron-forward.svg';
import { InternalAppLink } from '../InternalAppLink';
import {css} from '@emotion/core';

interface IProps {}

const BreadcrumbBar: React.FC<IProps> = ({ children }) => {
  return (
    <ul css={css({
      marginBottom: '1rem',
      fontWeight: 700,
      margin: 0,
      padding: 0,
      listStyle: 'none',
    })}>
      {children &&
        (Array.isArray(children) ? children : [children]).map(
          (child: any, index: number) => (
            <li key={child.key} css={css({
              display: 'inline-block',
              '& > a': {
                textDecoration: 'none',
              },
            })}>
              {child}
              {index < (children as any[]).length - 1 && (
                <span css={css({
                  marginLeft: '0.5em',
                  marginRight: '0.5em',
                  verticalAlign: 'middle',
                  '& > svg': {
                    width: '1em',
                    height: '1em',
                  },
                })}>
                  <ChevronForwardIcon />
                </span>
              )}
            </li>
          ),
        )}
    </ul>
  );
};

function generateBreadcrumbsFromPage(page: any) {
  return compact(
    [...page.ancestors, page].map((subPage) =>
      !!subPage.path ? (
        <InternalAppLink to={subPage.path} key={subPage.path}>
          {subPage.title}
        </InternalAppLink>
      ) : null,
    ),
  );
}

interface IContentProps extends IProps {
  page: any;
}

const ContentBreadcrumbBar = (props: IContentProps) => {
  return (
    <BreadcrumbBar {...omit(props, ['children'])}>
      {generateBreadcrumbsFromPage(props.page)}
    </BreadcrumbBar>
  );
};

export { BreadcrumbBar, generateBreadcrumbsFromPage, ContentBreadcrumbBar };
