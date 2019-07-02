import React, { useCallback } from 'react';
import { Modal } from '../Modal';
import { Accordion } from '../Accordion';
import { AccordionItem } from '../Accordion/AccordionItem';
import getApolloClientForFalmer from '@ussu/common/src/libs/getApolloClientForFalmer';
import { BannerOutlet } from '../BannerOutlet';
import { ApolloProvider } from 'react-apollo';
import { WebsiteRootState } from '../../types/website';
import { useMappedState } from 'redux-react-hook';

interface YourPageProps {
  isOpen: boolean;
}

export const YourPage: React.FC<YourPageProps & ReactModal.Props> = (props) => {
  const mapState = useCallback(
    (state: WebsiteRootState) => ({
      user: state.user,
      page: state.page,
    }),
    [],
  );
  const {
    user,
    page: { menu },
  } = useMappedState(mapState);

  if (!user || !user.profile) {
    return null;
  }

  return (
    <Modal size="small" {...props} footerClose>
      <h2 className="Modal__heading">
        {user.profile.firstName} {user.profile.lastName}
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
          onClick={user.actionBound || undefined}
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
