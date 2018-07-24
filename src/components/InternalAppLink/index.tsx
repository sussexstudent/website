import React from 'react';
import routes from '../../projects/website/routes';
import * as routerActions from '../../projects/website/ducks/router';
import { WebsiteRootState } from '../../types/website';
import { connect } from 'react-redux';
import { History, createLocation } from 'history';

interface InternalAppLinkProps extends React.HTMLProps<HTMLAnchorElement> {
  to: string;
  history: History;
  replace?: boolean;
  innerRef?: any;
  navigateTo: typeof routerActions.navigateTo;
}

const isModifiedEvent = (event: React.MouseEvent<HTMLAnchorElement>) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

class InternalAppLinkComponent extends React.Component<InternalAppLinkProps> {
  handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (this.props.onClick) this.props.onClick(event);

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      const { history, replace, to } = this.props;

      if (history) {
        if (replace) {
          history.replace(to);
        } else {
          history.push(to);
        }
      } else {
        this.props.navigateTo(to);
      }
    }
  };

  render() {
    const { to, history, innerRef, navigateTo, ...props } = this.props;
    const isClientRendered = routes.matches(to);

    if (isClientRendered) {
      if (history) {
        const location =
          typeof to === 'string'
            ? createLocation(to, null, undefined, history.location)
            : to;

        const href = history.createHref(location);

        return (
          <a {...props} ref={innerRef} onClick={this.handleClick} href={href} />
        );
      }

      // return (
      //   <a
      //     {...this.props}
      //     ref={innerRef}
      //     onClick={this.handleClick}
      //     href={to}
      //   />
      // );
    }

    return <a {...props} ref={innerRef} href={to} />;
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
