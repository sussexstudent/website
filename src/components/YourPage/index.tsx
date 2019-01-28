import React from 'react';
import { Modal } from '~components/Modal';
import { connect } from 'react-redux';
import { WebsiteRootState } from '~types/website';
import { UserState } from '~website/ducks/user';
import { PageState } from '~website/ducks/page';
import { Accordion } from '~components/Accordion';
import { AccordionItem } from '~components/Accordion/AccordionItem';
import getApolloClientForFalmer from '~libs/getApolloClientForFalmer';
import { BannerOutlet } from '~components/BannerOutlet';
import { ApolloProvider } from 'react-apollo';

interface YourPageProps {
  user: UserState;
  page: PageState;
  isOpen: boolean;
}

const YourPageComponent: React.FC<YourPageProps & ReactModal.Props> = (
  props,
) => {
  if (!props.user || !props.user.profile) {
    return null;
  }

  const { actionBound } = props.user;
  const { menu } = props.page;

  return (
    <Modal size="small" {...props} footerClose>
      <h2 className="Modal__heading">
        {props.user.profile.firstName} {props.user.profile.lastName}
      </h2>

      <ApolloProvider client={getApolloClientForFalmer}>
        <BannerOutlet outlet="yourpage.modal.top" />
      </ApolloProvider>

      <Accordion className="ModalAccordion">
        {menu.admin.areas.length > 0 || menu.admin.orgs.length > 0 ? (
          <AccordionItem
            name="admin"
            title={(props: any) => (
              <button {...props} type="button">
                Admin
              </button>
            )}
          >
            <ul className="ModalAccordion__content-list">
              {menu.admin.areas.map((item) => (
                <li key={item.name}>
                  <a href={item.link}>{item.name}</a>
                </li>
              ))}
              <hr />
              {menu.admin.orgs.map((item) => (
                <li key={item.name}>
                  <a href={item.link}>{item.name}</a>
                </li>
              ))}
            </ul>
          </AccordionItem>
        ) : null}
        {menu.page.actions.length > 0 ? (
          <AccordionItem
            name="page"
            title={(props: any) => (
              <button {...props} type="button">
                Page
              </button>
            )}
          >
            <ul className="ModalAccordion__content-list">
              {menu.page.actions.map((item) => (
                <li key={item.name}>
                  <a href={item.link}>{item.name}</a>
                </li>
              ))}
            </ul>
          </AccordionItem>
        ) : null}
      </Accordion>

      <div className="ModalAccordion__button-set">
        <a className="Button" href="/shop/basket">
          Basket
        </a>

        <button
          className="Button Button--color-red"
          onClick={actionBound || undefined}
          type="button"
        >
          Log out
        </button>
      </div>

      <ApolloProvider client={getApolloClientForFalmer}>
        <BannerOutlet outlet="yourpage.modal.bottom" />
      </ApolloProvider>
    </Modal>
  );
};

export const YourPage = connect((state: WebsiteRootState) => ({
  user: state.user,
  page: state.page,
}))(YourPageComponent);
