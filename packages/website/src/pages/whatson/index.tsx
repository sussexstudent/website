import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RouteComponent } from '@ussu/common/src/types/routes';
import { ScrollToTop } from '../../components/ScrollToTop';
import { EventDetailPageProps } from './EventDetailPage';
import loadable from '@loadable/component';
import { BrandingContainer } from './branding/components';
import { WhatsOnThemingProvider } from './WhatsOnBrandingContext';
import { WhatsOnSidebar } from './WhatsOnSidebar';
import { whatsOnListingViews } from './WhatsOnListings/views';
import { flatten } from 'lodash';
import { createBreakpoint } from 'react-use';
import { NewListings } from './WhatsOnListings/NewListings';
import { COLORS, MQ } from '@ussu/basil/src/style';
import { Modal } from '../../components/Modal';
import { MenuIcon } from '../../components/MenuIcon';

const LoadableDetail = loadable<EventDetailPageProps>(async () => {
  const { EventDetailPage } = await import('./EventDetailPage');
  return (props) => <EventDetailPage {...props} />;
});

const LoadableMyProgramme = loadable(async () => {
  const { WhatsOnMyProgramme } = await import('./WhatsOnMyProgramme');
  return (props) => <WhatsOnMyProgramme {...props} />;
});

type EventsApplicationProps = RouteComponent;

const useBreakpoint = createBreakpoint({ Medium: 768, Mobile: 350 });

export const WhatsOn: React.FC<EventsApplicationProps> = () => {
  const breakpoint = useBreakpoint();
  const [sidebarModal, setSidebarModal] = useState(false);

  return (
    <WhatsOnThemingProvider>
      <ScrollToTop>
        <BrandingContainer>
          {breakpoint === 'Mobile' && (
            <button
              onClick={() => setSidebarModal(true)}
              css={{
                zIndex: 200,
                borderRadius: '50%',
                boxShadow:
                  '0 3px 12px 1px rgba(30, 30, 30, 0.22), 0 2px 3px rgba(30, 30, 30, 0.1)',
                position: 'fixed',
                bottom: 20,
                right: 20,
                display: 'block',
                width: 48,
                padding: 12,
                height: 48,
                background: COLORS.BRAND_RED,
                border: 0,
              }}
            >
              <MenuIcon />
            </button>
          )}
          <div
            css={{
              display: 'flex',
              marginTop: '-1rem',
            }}
          >
            {breakpoint === 'Mobile' ? (
              <Modal
                isOpen={sidebarModal}
                footerClose={true}
                onRequestClose={() => setSidebarModal(false)}
              >
                <WhatsOnSidebar />
              </Modal>
            ) : (
              <aside
                css={{
                  [MQ.Medium]: {
                    flex: '0 0 16rem',
                    position: 'sticky',
                    height: '100vh',
                    overflowY: 'auto',
                    padding: '1rem',
                    paddingBottom: '3rem',
                    top: 0,
                    background: '#f0f0f6',
                    boxSizing: 'border-box',
                  },
                }}
              >
                <WhatsOnSidebar />
              </aside>
            )}

            <div
              css={{
                flex: 'auto',
              }}
            >
              <div className="u-keep-footer-down js-expand-container useAppScroll">
                <Switch>
                  <Redirect
                    from="/whats-on/periods/*"
                    to="/whats-on/collections/*"
                  />
                  <Route
                    path="/whats-on/groups"
                    component={() => (
                      <h1>List of student groups with events</h1>
                    )}
                    exact
                  />
                  <Route
                    path="/whats-on/venues"
                    component={() => <h1>List of venues with events</h1>}
                    exact
                  />
                  <Route
                    path="/whats-on/collections"
                    component={() => <h1>List of periods with events</h1>}
                    exact
                  />
                  <Route
                    path={flatten(whatsOnListingViews.map((view) => view.path))}
                    component={NewListings}
                    exact={true}
                  />
                  <Route
                    path="/whats-on/saved"
                    component={LoadableMyProgramme}
                  />
                  <Route
                    path={['/whats-on/**-:eventId', '/whats-on/:eventId']}
                    component={LoadableDetail}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </BrandingContainer>
      </ScrollToTop>
    </WhatsOnThemingProvider>
  );
};
