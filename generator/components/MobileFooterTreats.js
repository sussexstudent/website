import React from 'react';
import Social from './Social';

const MobileFooterTreats = () => (
  <div className="MobileFooterTreats">
    <div className="MobileFooterTreats__social">
      <Social />
    </div>
    <div>
      <a className="Button Button--yellow" href="/newsletter" data-action="newsletter_subscribe">
        Subscribe to our email newsletter
      </a>
    </div>
    <div className="MobileFooterTreats__to-top">
      <span>Back to top</span>
    </div>
  </div>
);

export default MobileFooterTreats;
