import { createBrandedComponent } from './createBrandedComponent';
import { WhatsOnBrandedComponentLocation } from './locations';
import React from 'react';
import EVENT_LISTINGS_BUNDLE from '../../EventsCalender/EventListingsBundle.graphql';
import { useQuery } from '@apollo/react-hooks';
import { type, TypeSize } from '@ussu/common/src/libs/style/type';
import { Layers } from '@ussu/common/src/libs/style';
import FauxRouterLink from '../../../components/FauxRouterLink';

export const BrandingContainer = createBrandedComponent(
  WhatsOnBrandedComponentLocation.Container,
  ({ children }) => <div>{children}</div>,
);
export const BundleBanner = createBrandedComponent(
  WhatsOnBrandedComponentLocation.BundleBanner,
  ({ bundle, onEvent }: { bundle: any; onEvent: boolean }) => {
    const { data, loading, error } = useQuery(EVENT_LISTINGS_BUNDLE, {
      variables: {
        bundleSlug: bundle.slug,
        filter: {
          bundle: bundle.slug,
        },
      },
    });

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
        <div className="LokiContainer">
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
              }}
            >
              <FauxRouterLink href={`/whats-on/bundle/${data.bundle.slug}`} />
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
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
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
          </div>
        </div>
      </div>
    );
  },
);
export const BrandingPeriodHeader = createBrandedComponent<{
  brandingPeriod: any;
}>(WhatsOnBrandedComponentLocation.PeriodHeader, ({ brandingPeriod }) => (
  <React.Fragment>
    <h2 className="type-brevier">Event Period</h2>
    <div>
      {brandingPeriod.logoVector ? (
        <img src={brandingPeriod.logoVector.resource} height="160" />
      ) : (
        <h1>{brandingPeriod.name}</h1>
      )}
      <div
        className="type-body-copy"
        dangerouslySetInnerHTML={{ __html: brandingPeriod.description }}
      />
    </div>
  </React.Fragment>
));
