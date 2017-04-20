import React from 'react';

function NSSBanner() {
  return (
    <a
      className="FlexibleHero FlexibleHero--link"
      style={{ backgroundColor: '#840056' }}
      href="/nssboycott"
    >
      <img
        className="FlexibleHero__image FlexibleHero__image--center"
        src="https://www.sussexstudent.com/pageassets/web-banner-img.svg"
        alt="Boycott the NSS"
      />
    </a>
  );
}

export default NSSBanner;
