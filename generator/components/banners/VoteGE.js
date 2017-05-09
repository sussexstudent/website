import React from 'react';

function VoteGE() {
  return (
    <a
      className="FlexibleHero FlexibleHero--link"
      style={{ backgroundColor: '#1DB8A4' }}
      href="https://www.gov.uk/register-to-vote"
    >
      <img
        style={{ maxHeight: '300px' }}
        className="FlexibleHero__image FlexibleHero__image--center"
        src="https://www.sussexstudent.com/pageassets/vote-ge-banner.svg"
        alt="Register to vote by May 22nd"
      />
    </a>
  );
}

export default VoteGE;
