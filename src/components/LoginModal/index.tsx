import React from 'react';
import { Modal } from '~components/Modal';
import { BannerOutlet } from '~components/BannerOutlet';
import { ApolloProvider } from 'react-apollo';
import getApolloClientForFalmer from '~libs/getApolloClientForFalmer';

interface LoginModalProps {}

export const LoginModal: React.FC<LoginModalProps & ReactModal.Props> = (
  props,
) => {
  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <Modal size="small" {...props} footerClose>
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
            Sussex Students
          </a>
        </li>
        <li>
          <a
            className="LoginActions__item-anchor"
            href={`https://www.sussexstudent.com/sso/login.ashx?idp=BSMS_SHIB&ReturnUrl=${currentPath}`}
          >
            BSMS Students
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

      <ApolloProvider client={getApolloClientForFalmer}>
        <BannerOutlet outlet="login.modal.bottom" />
      </ApolloProvider>
    </Modal>
  );
};
