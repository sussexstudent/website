import React from 'react';
import cx from 'classnames';

interface NetworkInfo {
  link: string;
  name?: string;
}

interface SocialArrayProps {
  networks: {
    facebook?: NetworkInfo;
    twitter?: NetworkInfo;
    instagram?: NetworkInfo;
    snapchat?: NetworkInfo;
    linkedin?: NetworkInfo;
    website?: NetworkInfo;
  };
}

export const SocialArray: React.FC<SocialArrayProps> = ({ networks }) => (
  <ul className={cx('Social')}>
    {networks.facebook ? (
      <li>
        <a className="Social__link" href={networks.facebook.link}>
          <span className="Social__icon Social__icon--facebook">
            <span className="u-h">Facebook</span>
          </span>

          <span className="Social__handle">
            {networks.facebook.name ?? 'Facebook'}
          </span>
        </a>
      </li>
    ) : null}
    {networks.twitter ? (
      <li>
        <a className="Social__link" href={networks.twitter.link}>
          <span className="Social__icon Social__icon--twitter">
            <span className="u-h">Twitter</span>
          </span>
          <span className="Social__handle">
            {networks.twitter.name ?? 'Twitter'}
          </span>
        </a>
      </li>
    ) : null}
    {networks.instagram ? (
      <li>
        <a className="Social__link" href={networks.instagram.link}>
          <span className="Social__icon Social__icon--instagram">
            <span className="u-h">Instagram</span>
          </span>

          <span className="Social__handle">
            {networks.instagram.name ?? 'Instagram'}
          </span>
        </a>
      </li>
    ) : null}
    {networks.snapchat ? (
      <li>
        <a className="Social__link" href={networks.snapchat.link}>
          <span className="Social__icon Social__icon--snapchat">
            <span className="u-h">Snapchat</span>
          </span>

          <span className="Social__handle">
            {networks.snapchat.name ?? 'Snapchat'}
          </span>
        </a>
      </li>
    ) : null}
    {networks.linkedin ? (
      <li>
        <a className="Social__link" href={networks.linkedin.link}>
          <span className="Social__icon Social__icon--linkedin">
            <span className="u-h">Linkedin</span>
          </span>

          <span className="Social__handle">
            {networks.linkedin.name ?? 'Linkedin'}
          </span>
        </a>
      </li>
    ) : null}
    {networks.website ? (
      <li>
        <a className="Social__link" href={networks.website.link}>
          <span className="Social__icon Social__icon--website">
            <span className="u-h">Site</span>
          </span>

          <span className="Social__handle">
            {networks.website.name ?? 'Site'}
          </span>
        </a>
      </li>
    ) : null}
  </ul>
);
