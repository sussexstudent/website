import React, { useCallback } from 'react';
import routes from '../../routes';
import { Link, NavLink } from 'react-router-dom';
import { useMappedState } from 'redux-react-hook';
import { WebsiteRootState } from '../../types/website';

interface InternalAppLinkComponentProps {
  to: string;
  replace?: boolean;
  innerRef?: any;
  nav?: boolean;
  activeStyle?: any;
  exact?: boolean;
}

type Props = InternalAppLinkComponentProps & React.HTMLProps<HTMLAnchorElement>;

export const InternalAppLink: React.FC<Props> = ({
  to,
  innerRef,
  nav,
  exact,
  ...props
}) => {
  const mapState = useCallback(
    (state: WebsiteRootState) => ({
      history: state.router.history,
    }),
    [],
  );

  try {
    const { history } = useMappedState(mapState);
    const isClientRendered = routes.matches(to);

    if (isClientRendered) {
      if (history) {
        if (nav) {
          return <NavLink to={to} {...(props as any)} exact={exact} />; // todo
        }
        return <Link to={to} {...(props as any)} />; // todo
      }
    }
  } catch (e) {}

  return React.createElement('a', {
    ...props,
    ref: innerRef,
    href: to,
  });
};
