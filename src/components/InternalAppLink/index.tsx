import React from 'react';
import { History } from 'history';
import routes from '../../projects/website/routes';
import * as routerActions from '../../projects/website/ducks/router';
import { WebsiteRootState } from '~types/website';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

interface InternalAppLinkComponentProps {
  to: string;
  replace?: boolean;
  innerRef?: any;
}

interface InternalAppLinkAmbientProps {
  history: null | History;
  navigateTo: typeof routerActions.navigateTo;
}

type InternalAppLinkProps = InternalAppLinkAmbientProps &
  InternalAppLinkComponentProps &
  React.HTMLProps<HTMLAnchorElement>;

class InternalAppLinkComponent extends React.Component<InternalAppLinkProps> {
  render() {
    const { to, history, innerRef, navigateTo, ref, ...props } = this.props;
    const isClientRendered = routes.matches(to);

    if (isClientRendered) {
      if (history) {
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
    history: state.router.history,
  }),
  {
    navigateTo: routerActions.navigateTo,
  },
)(InternalAppLinkComponent);
