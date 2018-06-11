import React from 'react';
import FreshersLogo from '../../../icons/freshers-no-year.svg';
import { NewsletterSignup } from '~components/NewsletterSignup';

function FreshersHomepage() {
  return (
    <div>
      <style>
        {`
         .FreshersLogoContainer {
          color: #484598;
          max-width: 400px;
          width: 80%;
          margin: 1rem auto;
         }
         .FreshersLogoContainer svg{
           width: 100%;
           height: auto;
         }
        `}
      </style>
      <div className="FreshersLogoContainer">
        <FreshersLogo />
      </div>
      <NewsletterSignup />
    </div>
  );
}

export default FreshersHomepage;
