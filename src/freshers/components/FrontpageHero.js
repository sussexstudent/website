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
      const TILT_BOUND = 400;
      const TILT_DEG = 4;
      document.addEventListener('DOMContentLoaded', () => {
        /*
        See below - logo tilt.*/
        const freshersLogoEl = document.querySelector('.FreshersLogo');
        const freshersBounds = freshersLogoEl.getBoundingClientRect();
        const freshersCenter = {
          x: freshersBounds.left + window.scrollX + freshersBounds.width / 2,
          y: freshersBounds.top + window.scrollY + freshersBounds.height / 2,
        };

        const parts = items.map(el => {
          const bounds = el.getBoundingClientRect();
          return {
            originalX: bounds.left + window.scrollX,
            originalY: bounds.top + window.scrollY,
            rotate: el.getAttribute('transform'),
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

            // Update scatter
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
              // console.log(`translate(${transX}px, ${transY}px) ${item.rotate}`);
              item.el.style.transform = `translate(${transX}px, ${transY}px)`;
            });

            // Logo Tilt - tad broken; should move out of svg - awaiting v2
            const fromX = freshersCenter.x - currentForcePoint.x;
            const fromY = freshersCenter.y - currentForcePoint.y;

            const degX = fromX > 0
              ? -(Math.min(TILT_BOUND, fromX) / TILT_BOUND)
              : Math.max(-TILT_BOUND, fromX) / -TILT_BOUND;
            const degY = fromY > 0
              ? Math.min(TILT_BOUND, fromY) / TILT_BOUND
              : -(Math.max(-TILT_BOUND, fromY) / -TILT_BOUND);

            freshersLogoEl.style.transform = `rotateX(${degY *
              TILT_DEG}deg) rotateY(${degX * TILT_DEG}deg)`;
          }

          requestAnimationFrame(animate);
        }

        animate();

        document.addEventListener('mousemove', e => {
          const { pageX, pageY } = e;
          if (currentForcePoint.x === pageX && currentForcePoint.y === pageY) {
            hasChanged = false;
            return;
          }
          // console.log('moved');
          // console.log(currentForcePoint.x)
          // console.log(e.clientX);
          currentForcePoint.x = pageX;
          currentForcePoint.y = pageY;
          hasChanged = true;
        });
      });
    }

    createMagneticEffect();
  }

  render() {
    return (
      <HeroSvg style={{ width: '100%', height: 'auto', maxHeight: '90vh' }} />
    );
  }
}

export default FrontpageHero;
