import React from 'react';
import { Modal } from '~components/Modal';
import Button from '~components/Button';

interface LoginModalProps {}

export class LoginModal extends React.Component<
  LoginModalProps & ReactModal.Props
> {
  render() {
    const currentPath = '/'; // window.location.pathname;

    return (
      <Modal isOpen={true} size="small" {...this.props}>
        <h1>Log in</h1>
        <ul>
          <li>
            <Button
              href={`https://www.sussexstudent.com/sso/login.ashx?idp=SUSSEX_SHIB&ReturnUrl=${currentPath}`}
            >
              Sussex SSO
            </Button>
          </li>
          <li>
            <Button
              href={`https://www.sussexstudent.com/sso/login.ashx?idp=BSMS_SHIB&ReturnUrl=${currentPath}`}
            >
              BSMS SSO
            </Button>
          </li>
        </ul>
      </Modal>
    );
  }
}
