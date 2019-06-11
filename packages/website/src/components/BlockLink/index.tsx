import React from 'react';
import cx from 'classnames';
import { InternalAppLink } from '../InternalAppLink';

interface BlockLinkProps {
  to: string;
  external?: boolean;
}

export const BlockLink: React.FC<BlockLinkProps> = (props) => (
  <InternalAppLink
    className={cx('BlockLink', {
      'BlockLink--external': props.external,
      'BlockLink--internal': !props.external,
    })}
    to={props.to}
  >
    {props.children}
  </InternalAppLink>
);
