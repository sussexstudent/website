import React from 'react';
import routes from '../../projects/website/routes';
import * as routerActions from '../../projects/website/ducks/router';
import { WebsiteRootState } from '~types/website';
import { connect } from 'react-redux';
import { Link, NavigateFn } from '@reach/router';

interface InternalAppLinkComponentProps {
  to: string;
  replace?: boolean;
  innerRef?: any;
}

interface InternalAppLinkAmbientProps {
  navigate: null | NavigateFn;
  navigateTo: typeof routerActions.navigateTo;
}

type InternalAppLinkProps = InternalAppLinkAmbientProps &
  InternalAppLinkComponentProps &
  React.HTMLProps<HTMLAnchorElement>;

class InternalAppLinkComponent extends React.Component<InternalAppLinkProps> {
  render() {
    const { to, navigate, innerRef, navigateTo, ref, ...props } = this.props;
    const isClientRendered = routes.matches(to);

    if (isClientRendered) {
      if (navigate) {
        return <Link to={to} {...props} />;
      }
    }

    return React.createElement('a', {
      ...props,
      ref: innerRef,
      href: to,
    });
  }
}

export const InternalAppLink = connect(
  (state: WebsiteRootState) => ({
    navigate: state.router.navigate,
  }),
  {
    navigateTo: routerActions.navigateTo,
  },
)(InternalAppLinkComponent);
