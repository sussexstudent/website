import { SocialMenu } from '../../../website/src/components/SocialMenu';
import { css } from '@emotion/core';

export default { title: 'Page|Mobile Footer Treats' };

export const Default = () => (
  <div className="MobileFooterTreats" css={css({ display: 'block' })}>
    <div className="MobileFooterTreats__social">
      <SocialMenu mobile />
    </div>
    <div>
      <a className="Button" href="#" data-action="newsletter_subscribe">
        Subscribe to our email newsletter
      </a>
    </div>
    <a className="MobileFooterTreats__to-top" href="#top">
      <span>Back to top</span>
    </a>
  </div>
);
