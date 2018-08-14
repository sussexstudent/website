import React from 'react';
import { Modal } from '~components/Modal';
import {BannerOutlet} from "~components/BannerOutlet";
import {ApolloProvider} from 'react-apollo';
import getApolloClientForFalmer from '~libs/getApolloClientForFalmer';

interface LoginModalProps {}

export class LoginModal extends React.Component<
  LoginModalProps & ReactModal.Props
> {
  render() {
    const currentPath =
      typeof window !== 'undefined' ? window.location.pathname : '/';

    return (
      <Modal size="small" {...this.props} footerClose>
        <h1 className="Modal__heading">Log in</h1>
        <ApolloProvider client={getApolloClientForFalmer}>
          <BannerOutlet outlet="login.modal.top" />
        </ApolloProvider>
        <ul className="LoginActions">
          <li>
            <a
              className="LoginActions__item-anchor"
              href={`https://www.sussexstudent.com/sso/login.ashx?idp=SUSSEX_SHIB&ReturnUrl=${currentPath}`}
            >
              Sussex SSO
            </a>
          </li>
          <li>
            <a
              className="LoginActions__item-anchor"
              href={`https://www.sussexstudent.com/sso/login.ashx?idp=BSMS_SHIB&ReturnUrl=${currentPath}`}
            >
              BSMS SSO
            </a>
          </li>
          <li>
            <a
              className="LoginActions__item-anchor"
              href={`https://www.sussexstudent.com/login`}
            >
              Study Group & Gothenburg students
            </a>
          </li>
          <li>
            <a
              className="LoginActions__item-anchor"
              href={`https://www.sussexstudent.com/login`}
            >
              Other users
            </a>
          </li>
        </ul>
        <a href="https://www.sussexstudent.com/login">Register</a>

        <ApolloProvider client={getApolloClientForFalmer}>
          <BannerOutlet outlet="login.modal.bottom" />
        </ApolloProvider>
      </Modal>
    );
  }
}
