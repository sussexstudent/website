import React from 'react';
import Social from '~components/SocialMenu';

const MobileFooterTreats = () =>
  <div className="MobileFooterTreats">
    <div className="MobileFooterTreats__social">
      <Social />
    </div>
    <div>
      <a
        className="Button Button--yellow"
        href="/newsletter"
        data-action="newsletter_subscribe"
      >
        Subscribe to our email newsletter
      </a>
    </div>
    <a className="MobileFooterTreats__to-top" href="#top">
      <span>Back to top</span>
    </a>
  </div>;

export default MobileFooterTreats;
