import React from 'react';
import cx from 'classnames';
import convert from 'htmr';
import BANNER_QUERY from './AllActiveBanners.graphql';
import { useQuery } from '@apollo/react-hooks';
import { GetActiveBannersQuery } from '../../generated/graphql';

interface BannerOutletProps {
  outlet: string;
  container?: (props: { children: any }) => any;
}

export const BannerOutlet: React.FC<BannerOutletProps> = ({ outlet , container }) => {
  const { data, loading } = useQuery<GetActiveBannersQuery>(BANNER_QUERY);

  if (loading || !data) {
    return null;
  }

  const suitableBanners = data.allActiveBanners.filter(
    (b) => b.outlet === outlet,
  );

  if (suitableBanners.length <= 0) {
    return null;
  }

  const content = (
    <ul className="BannerList List--reset">
      {!loading &&
        data &&
        suitableBanners.map((banner) => (
          <li
            className={cx('Banner', `Banner--purpose-${banner.purpose}`)}
            key={banner.id}
          >
            <div className="Banner__heading type-pica">{banner.heading}</div>
            <div className="Banner__body type-long-primer">
              {convert(banner.body)}
            </div>
          </li>
        ))}
    </ul>
  );

  return container ? container({ children: content }) : content;
};
