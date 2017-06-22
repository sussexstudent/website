/* eslint-disable no-param-reassign */
import React from 'react';
import HeroSvg from './HeroSVG';

class FrontpageHero extends React.Component {
  componentDidMount() {
    const items = [...document.querySelectorAll('svg > g > g, circle')];
    items.map(g => (g.style.opacity = 0));

    setTimeout(() => {
      items.map(g =>
        setTimeout(() => (g.style.opacity = 1), Math.random() * 1800)
      );
    }, 200);

    function createMagneticEffect() {
      const FORCE_RADIUS = 250;
      document.addEventListener('DOMContentLoaded', () => {
        const parts = items.map(el => {
          const bounds = el.getBoundingClientRect();
          return {
            originalX: bounds.left,
            originalY: bounds.top,
            el,
          };
        });

        const currentForcePoint = {
          x: null,
          y: null,
        };

        let hasChanged = false;

        function animate() {
          if (hasChanged) {
            hasChanged = false;
            parts.forEach(item => {
              const fromX = item.originalX - currentForcePoint.x;
              const fromY = item.originalY - currentForcePoint.y;
              let transX = 0;
              let transY = 0;
              const distance = Math.hypot(fromX, fromY);
              const angle = Math.atan2(fromX, fromY);
              const repel = (FORCE_RADIUS - distance) * 0.4;

              if (distance < FORCE_RADIUS) {
                transX = Math.sin(angle) * repel;
                transY = Math.cos(angle) * repel;
              }

              item.el.style.transform = `translate(${transX}px, ${transY}px)`;
            });
          }

          requestAnimationFrame(animate);
        }

        animate();

        document.addEventListener('mousemove', e => {
          if (
            currentForcePoint.x === e.clientX &&
            currentForcePoint.y === e.clientY
          ) {
            hasChanged = false;
            return;
          }
          // console.log('moved');
          // console.log(currentForcePoint.x)
          // console.log(e.clientX);
          currentForcePoint.x = e.clientX;
          currentForcePoint.y = e.clientY;
          hasChanged = true;
        });
      });
    }

    createMagneticEffect();
  }

  render() {
    return <HeroSvg style={{ width: '100%', height: 'auto' }} />;
  }
}

export default FrontpageHero;
