import React from 'react';
import cx from 'classnames';

export const SocialMenu: React.FC<{ asList?: boolean; mobile?: boolean }> = ({
  asList = false,
  mobile = false,
}) => (
  <ul className={cx('Social', { 'Social--as-list': asList })}>
    <li>
      <a
        className="Social__link"
        href="https://www.facebook.com/thestudentsunion/"
      >
        <span
          className={cx('Social__icon', {
            'Social__icon--facebook-black': mobile,
            'Social__icon--facebook-white': !mobile,
          })}
        >
          <span className="u-h">Facebook</span>
        </span>

        <span className="Social__handle">thestudentsunion</span>
      </a>
    </li>
    <li>
      <a className="Social__link" href="https://twitter.com/ussu">
        <span
          className={cx('Social__icon', {
            'Social__icon--twitter-black': mobile,
            'Social__icon--twitter-white': !mobile,
          })}
        >
          <span className="u-h">Twitter</span>
        </span>
        <span className="Social__handle">@ussu</span>
      </a>
    </li>
    <li>
      <a className="Social__link" href="https://www.instagram.com/sussexsu/">
        <span
          className={cx('Social__icon', {
            'Social__icon--instagram-black': mobile,
            'Social__icon--instagram-white': !mobile,
          })}
        >
          <span className="u-h">Instagram</span>
        </span>

        <span className="Social__handle">sussexsu</span>
      </a>
    </li>
    <li>
      <a
        className="Social__link"
        href="https://www.linkedin.com/company/830392"
      >
        <span
          className={cx('Social__icon', {
            'Social__icon--linkedin-black': mobile,
            'Social__icon--linkedin-white': !mobile,
          })}
        >
          <span className="u-h">Linkedin</span>
        </span>

        <span className="Social__handle">Sussex Students'​ Union</span>
      </a>
    </li>
    <li>
      <a
        className="Social__link"
        href="https://www.youtube.com/channel/UCy173_9BtJP2iHJadDyhlNQ"
      >
        <span
          className={cx('Social__icon', {
            'Social__icon--youtube-black': mobile,
            'Social__icon--youtube-white': !mobile,
          })}
        >
          <span className="u-h">Youtube</span>
        </span>

        <span className="Social__handle">sussexstudentsunion</span>
      </a>
    </li>
  </ul>
);
