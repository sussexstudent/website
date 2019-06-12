import React, { useCallback } from 'react';
import routes from '../../routes';
import { Link } from 'react-router-dom';
import { useMappedState } from 'redux-react-hook';
import { WebsiteRootState } from '../../types/website';

interface InternalAppLinkComponentProps {
  to: string;
  replace?: boolean;
  innerRef?: any;
}

type Props = InternalAppLinkComponentProps & React.HTMLProps<HTMLAnchorElement>;

export const InternalAppLink: React.FC<Props> = ({
  to,
  innerRef,
  ...props
}) => {
  const mapState = useCallback(
    (state: WebsiteRootState) => ({
      history: state.router.history,
    }),
    [],
  );
  const { history } = useMappedState(mapState);

  const isClientRendered = routes.matches(to);

  if (isClientRendered) {
    if (history) {
      return <Link to={to} {...(props as any)} />; // todo
    }
  }

  return React.createElement('a', {
    ...props,
    ref: innerRef,
    href: to,
  });
};
