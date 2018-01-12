import React from 'react';
import { NewsletterSignup } from '../NewsletterSignup';
import FreshersLogo from '../../icons/freshers-no-year.svg';
import HydroLeaf from "~components/HydroLeaf";

function FreshersApp() {
  return (
    <div>
      <FreshersLogo />
      <NewsletterSignup />
    </div>
  );
}

export default HydroLeaf({ disableSSR: true })(FreshersApp);


