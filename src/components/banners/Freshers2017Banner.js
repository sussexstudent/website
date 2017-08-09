import React from 'react';
import HydroLeaf from '~components/HydroLeaf';
import FreshersLogoHero from '~components/FreshersLogoHero';

function FreshersWeek2017Banner() {
  return (
    <a
      className="FlexibleHero FlexibleHero--bleed FlexibleHero--link"
      style={{ backgroundColor: '#ff546a', height: '350px' }}
      href="/freshers"
    >
      <FreshersLogoHero />
    </a>
  );
}

export const Hydro = HydroLeaf({ disableSSR: true })(FreshersWeek2017Banner);
export default FreshersWeek2017Banner;
