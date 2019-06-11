import React from 'react';
import cx from 'classnames';
import convert from 'htmr';
import BANNER_QUERY from './AllActiveBanners.graphql';
import { Query } from 'react-apollo';

interface BannerOutletProps {
  outlet: string;
}

interface Banner {
  id: string;
  outlet: string;
  heading: string;
  body: string;
  purpose: string;
}

interface Result {
  allActiveBanners: Banner[];
}

class BannerQuery extends Query<Result> {}

export const BannerOutlet: React.FC<BannerOutletProps> = ({ outlet }) => (
  <BannerQuery query={BANNER_QUERY}>
    {({ data, loading }) => {
      if (loading || !data) {
        return null;
      }

      const suitableBanners = data.allActiveBanners.filter(
        (b) => b.outlet === outlet,
      );

      if (suitableBanners.length <= 0) {
        return null;
      }

      return (
        <ul className="BannerList List--reset">
          {!loading &&
            data &&
            suitableBanners.map((banner) => (
              <li
                className={cx('Banner', `Banner--purpose-${banner.purpose}`)}
                key={banner.id}
              >
                <div className="Banner__heading type-pica">
                  {banner.heading}
                </div>
                <div className="Banner__body type-long-primer">
                  {convert(banner.body)}
                </div>
              </li>
            ))}
        </ul>
      );
    }}
  </BannerQuery>
);
