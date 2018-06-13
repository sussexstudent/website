import React from 'react';
import { Modal } from '~components/Modal';
import { connect } from 'react-redux';
import { WebsiteRootState } from '../../types/website';
import { UserState } from '../../projects/website/ducks/user';
import { PageState } from '../../projects/website/ducks/page';

interface YourPageProps {
  user: UserState;
  page: PageState;
}

const YourPageComponent: React.SFC<YourPageProps> = (props) => {
  if (!props.user || !props.user.profile) {
    return null;
  }

  return (
    <Modal isOpen footerClose>
      <h1>
        {props.user.profile.firstName} {props.user.profile.lastName}
      </h1>
    </Modal>
  );
};

export const YourPage = connect((state: WebsiteRootState) => ({
  user: state.user,
  page: state.page,
}))(YourPageComponent);
