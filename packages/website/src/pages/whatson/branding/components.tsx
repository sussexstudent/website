import { createBrandedComponent } from './createBrandedComponent';
import { WhatsOnBrandedComponentLocation } from './locations';
import React, { useState } from 'react';
import EVENT_LISTINGS_BUNDLE from '../WhatsOnListings/EventListingsBundle.graphql';
import { useQuery } from '@apollo/react-hooks';
import { type, TypeSize } from '@ussu/basil/src/style/type';
import { COLORS, Layers, MQ } from '@ussu/basil/src/style';
import FauxRouterLink from '../../../components/FauxRouterLink';
import { BuyButton } from '../EventDetailPage/BuyButton';
import { GetEventsByBundleSlugQuery } from '../../../generated/graphql';
import { Modal } from '../../../components/Modal';
import { Skeleton } from '../../../components/Skeleton';

export const BrandingContainer = createBrandedComponent(
  WhatsOnBrandedComponentLocation.Container,
  ({ children }) => <div>{children}</div>,
);
export const BundleBanner = createBrandedComponent(
  WhatsOnBrandedComponentLocation.BundleBanner,
  ({ bundle, onEvent }: { bundle: any; onEvent: boolean }) => {
    const { data, loading, error } = useQuery<GetEventsByBundleSlugQuery>(
      EVENT_LISTINGS_BUNDLE,
      {
        variables: {
          bundleSlug: bundle.slug,
          filter: {
            bundle: bundle.slug,
          },
        },
      },
    );

    if (!data || loading || error) {
      return null;
    }

    return (
      <div
        css={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: Layers.Header_mobile,
        }}
      >
        <div>
          <div css={{ padding: '0 1rem' }}>
            <div
              css={{
                margin: '0 auto',
                background: '#FAD00F',
                boxShadow: '0 0 23px 0 rgba(0,0,0,0.21)',
                borderTopRightRadius: '6px',
                borderTopLeftRadius: '6px',
                padding: '1rem',
                color: 'rgba(0, 0, 0, 0.7)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div css={{ display: 'flex', flexDirection: 'row' }}>
                <div
                  css={{
                    flex: 'auto',
                    minWidth: 0,
                    position: 'relative',
                    [MQ.Medium]: { paddingRight: '2rem' },
                  }}
                >
                  <FauxRouterLink
                    href={`/whats-on/bundle/${data.bundle.slug}`}
                  />
                  {onEvent ? (
                    <div css={[{ fontWeight: 600 }, type(TypeSize.Brevier)]}>
                      Part of the
                    </div>
                  ) : null}
                  <h2 css={[{ margin: 0 }, type(TypeSize.GreatPrimer)]}>
                    {data.bundle.name}
                  </h2>
                  <div
                    css={[
                      {
                        fontWeight: 600,
                      },
                      type(TypeSize.Brevier),
                    ]}
                  >
                    Includes:{' '}
                    {data.allEvents.edges
                      .map((event: any) => event.node.title)
                      .join(', ')}
                  </div>
                </div>
                {data.bundle.ticketData ? (
                  <div
                    css={{
                      display: 'none',
                      zIndex: Layers.FauxLinkBreakout,
                      [MQ.Medium]: { display: 'block' },
                    }}
                  >
                    <BuyButton
                      title="Buy Bundle"
                      href={data.bundle.ticketData}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
export const BrandingPeriodHeader = createBrandedComponent<{
  brandingPeriod: any;
}>(WhatsOnBrandedComponentLocation.PeriodHeader, ({ brandingPeriod }) => {
  const [moreInfoModal, setMoreInfoModal] = useState(false);
  return (
    <React.Fragment>
      <div css={{ paddingTop: '1rem' }}>
        <div css={{ textAlign: 'center' }}>
          {brandingPeriod?.logoVector ? (
            <img src={brandingPeriod.logoVector.resource} height="180" />
          ) : (
            <h1>
              {brandingPeriod?.name ?? (
                <Skeleton template="____ ___ ____ ____" />
              )}
            </h1>
          )}
          {/*<div css={{ fontWeight: 600, fontStyle: 'italic' }}>DATES - DATE</div>*/}
          <button
            type="button"
            css={[
              type(TypeSize.Minion),
              {
                textDecoration: 'underline',
                border: 0,
                background: 'transparent',
                color: COLORS.GREY_WORST_WINTER,
              },
            ]}
            onClick={() => setMoreInfoModal(true)}
          >
            More info
          </button>
        </div>
        <Modal
          isOpen={moreInfoModal}
          onRequestClose={() => setMoreInfoModal(false)}
          footerClose
        >
          <div>
            <h1>
              {brandingPeriod?.name ?? (
                <Skeleton template="____ ___ ____ ____" />
              )}
            </h1>
            <h2>More info</h2>
            {brandingPeriod?.description ? (
              <div
                className="type-body-copy Prose"
                dangerouslySetInnerHTML={{ __html: brandingPeriod.description }}
              />
            ) : (
              <Skeleton count={4} />
            )}
          </div>
        </Modal>
      </div>
    </React.Fragment>
  );
});
