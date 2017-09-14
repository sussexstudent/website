/* eslint-disable no-param-reassign */
import React from 'react';
import HeroSvg from './FreshersSVG';

class FrontpageHero extends React.Component {
  componentDidMount() {
    const heroSvg = document.querySelector('.FlexibleHero svg');
    const items = [...heroSvg.querySelectorAll('svg > g > g, circle')];
    items.forEach(g => {
      g.style.opacity = 0;
    });

    setTimeout(() => {
      items.map(g =>
        setTimeout(() => {
          g.style.opacity = 1;
        }, Math.random() * 1800)
      );
    }, 200);
  }

  render() {
    return (
      <HeroSvg
        className="HeroSVG"
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '90vh',
        }}
      />
    );
  }
}

export default FrontpageHero;
