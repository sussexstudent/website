import React from 'react';

function OneWorldWeek() {
  return (
    <a
      className="FlexibleHero FlexibleHero--oww FlexibleHero--link"
      style={{ backgroundColor: '#120e1c' }}
      href="/oww"
    >
      <div className="FlexibleHero__content">
        <h1 className="FlexibleHero__title">One World Week 2017</h1>
        <h2 className="FlexibleHero__sub">13th - 17th March</h2>
      </div>
      <div className="FlexibleHero__bgImage-container">
        <div style={{ backgroundImage: 'url(/pageassets/oww-center.jpg)' }} />
      </div>
    </a>
  );
}

export default OneWorldWeek;
