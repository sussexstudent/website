import React from 'react';
import { NewsletterSignup } from '~components/NewsletterSignup';
import { Lottie } from '~components/Lottie';
import logoAnimation from '../../freshers/logoAnimation.json';

function FreshersHomepage() {
  return (
    <div className="FreshersSite u-keep-footer-down">
      <div className="FreshersLogoContainer">
        <Lottie
          loop={false}
          autoplay={true}
          data={logoAnimation}
          renderer="svg"
        />
      </div>
      <NewsletterSignup />
    </div>
  );
}

export default FreshersHomepage;
