import React from 'react';
import { NewsletterSignup } from '~components/NewsletterSignup';
import { Lottie } from '~components/Lottie';
import logoAnimation from '../../freshers/logoAnimation.json';

function FreshersHomepage() {
  return (
    <React.Fragment>
      <div className="FreshersLogoContainer">
        <div className="u-responsive-ratio u-responsive-ratio--r23by8">
          <Lottie
            loop={false}
            autoplay={true}
            data={logoAnimation}
            renderer="svg"
          />
        </div>
      </div>
      <NewsletterSignup />
    </React.Fragment>
  );
}

export default FreshersHomepage;
