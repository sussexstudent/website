import React from 'react';
import { compact, omit } from 'lodash';
import cx from 'classnames';

import ChevronForwardIcon from '~icons/chevron-forward.svg';
import { InternalAppLink } from '~components/InternalAppLink';

interface IProps {
  color?: 'red' | 'blue' | 'green' | 'slate';
}

const BreadcrumbBar: React.SFC<IProps> = ({ color = 'blue', children }) => {
  return (
    <ul
      className={cx(
        'BackBar',
        'BackBar--breadcrumb',
        `BackBar--color-${color}`,
      )}
    >
      {children &&
        (Array.isArray(children) ? children : [children]).map(
          (child: any, index: number) => (
            <li>
              {child}
              {index < (children as any[]).length - 1 && (
                <span className="BackBar__chevron">
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
