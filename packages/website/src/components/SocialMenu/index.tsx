import React from 'react';
import cx from 'classnames';

export const SocialMenu: React.FC<{ asList?: boolean }> = ({
  asList = false,
}) => (
  <ul className={cx('Social', { 'Social--as-list': asList })}>
    <li>
      <a
        className="Social__link"
        href="https://www.facebook.com/thestudentsunion/"
      >
        <span className="Social__icon Social__icon--facebook">
          <span className="u-h">Facebook</span>
        </span>

        <span className="Social__handle">thestudentsunion</span>
      </a>
    </li>
    <li>
      <a className="Social__link" href="https://twitter.com/ussu">
        <span className="Social__icon Social__icon--twitter">
          <span className="u-h">Twitter</span>
        </span>
        <span className="Social__handle">@ussu</span>
      </a>
    </li>
    <li>
      <a className="Social__link" href="https://www.instagram.com/sussexsu/">
        <span className="Social__icon Social__icon--instagram">
          <span className="u-h">Instagram</span>
        </span>

        <span className="Social__handle">sussexsu</span>
      </a>
    </li>
    <li>
      <a
        className="Social__link"
        data-action="snapchat"
        href="https://www.snapchat.com/add/sussexstudent"
      >
        <span className="Social__icon Social__icon--snapchat">
          <span className="u-h">Snapchat</span>
        </span>

        <span className="Social__handle">sussexstudent</span>
      </a>
    </li>
  </ul>
);
