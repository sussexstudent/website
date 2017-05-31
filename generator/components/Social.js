import React from 'react';

const Social = () => (
  <ul className="Social">
    <li>
      <a
        className="Social__link Social__link--facebook"
        href="https://www.facebook.com/thestudentsunion/"
      >
        <span className="u-h">Facebook</span>
      </a>
    </li>
    <li>
      <a
        className="Social__link Social__link--twitter"
        href="https://twitter.com/ussu"
      >
        <span className="u-h">Twitter</span>
      </a>
    </li>
    <li>
      <a
        className="Social__link Social__link--instagram"
        href="https://www.instagram.com/sussexsu/"
      >
        <span className="u-h">Instagram</span>
      </a>
    </li>
    <li>
      <a
        className="Social__link Social__link--snapchat"
        data-action="snapchat"
        href="https://www.snapchat.com/add/sussexstudent"
      >
        <span className="u-h">Snapchat</span>
      </a>
    </li>
  </ul>
);

export default Social;
