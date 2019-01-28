import React from 'react';
import { compact, omit } from 'lodash';
import styled from '@emotion/styled';

import ChevronForwardIcon from '~icons/chevron-forward.svg';
import { InternalAppLink } from '~components/InternalAppLink';

interface IProps {}

const BreadcrumbList = styled.ul({
  marginBottom: '1rem',
  fontWeight: 700,
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

const BreadcrumbItem = styled.li({
  display: 'inline-block',
  '& > a': {
    textDecoration: 'none',
  },
});

const IconContainer = styled.span({
  marginLeft: '0.5em',
  marginRight: '0.5em',
  verticalAlign: 'middle',
  '& > svg': {
    width: '1em',
    height: '1em',
  },
});

const BreadcrumbBar: React.FC<IProps> = ({ children }) => {
  return (
    <BreadcrumbList>
      {children &&
        (Array.isArray(children) ? children : [children]).map(
          (child: any, index: number) => (
            <BreadcrumbItem key={child.key}>
              {child}
              {index < (children as any[]).length - 1 && (
                <IconContainer>
                  <ChevronForwardIcon />
                </IconContainer>
              )}
            </BreadcrumbItem>
          ),
        )}
    </BreadcrumbList>
  );
};

function generateBreadcrumbsFromPage(page: any) {
  return compact(
    [...page.ancestors, page].map(
      (subPage) =>
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
