import React from 'react';
import { SocialMenu } from '../SocialMenu';

export const MobileFooterTreats: React.FC = () => (
  <div className="MobileFooterTreats">
    <div className="MobileFooterTreats__social">
      <SocialMenu mobile />
    </div>
    <div>
      <a
        className="Button"
        href="/newsletter"
        data-action="newsletter_subscribe"
      >
        Subscribe to our email newsletter
      </a>
    </div>
    <a className="MobileFooterTreats__to-top" href="#top">
      <span>Back to top</span>
    </a>
  </div>
);
