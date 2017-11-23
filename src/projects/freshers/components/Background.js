/* eslint-disable no-param-reassign */
import React from 'react';
import BackgroundSvg from './BackgroundSvg';

class FrontpageHero extends React.Component {
  componentDidMount() {
    const heroSvg = document.querySelector('.HeroSVG');
    const items = [...heroSvg.querySelectorAll('g > use, circle')];
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

    // eslint-disable-next-line
    const createMagneticEffect = () => {
      const FORCE_RADIUS = 250;
      /* const TILT_BOUND = 400;
      const TILT_DEG = 4; */
      document.addEventListener('DOMContentLoaded', () => {
        const parts = items.map(el => {
          const bounds = el.getBoundingClientRect();
          return {
            originalX: bounds.left + window.scrollX,
            originalY: bounds.top + window.scrollY,
            currentX: bounds.left + window.scrollX,
            currentY: bounds.top + window.scrollY,
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
                transX = Math.round(Math.sin(angle) * repel);
                transY = Math.round(Math.cos(angle) * repel);
              }

              if (transX !== item.currentState || transY !== item.currentY) {
                item.el.style.transform = `translate3d(${transX}px, ${
                  transY
                }px, 0)`;
                item.currentX = transX;
                item.currentY = transY;
              }
            });
          }

          requestAnimationFrame(animate);
        }

        animate();
        console.log(this);
        this.element.addEventListener('mousemove', e => {
          const { pageX, pageY } = e;
          if (currentForcePoint.x === pageX && currentForcePoint.y === pageY) {
            hasChanged = false;
            return;
          }

          currentForcePoint.x = pageX;
          currentForcePoint.y = pageY;
          hasChanged = true;
        });
      });
    };

    // createMagneticEffect();
  }

  render() {
    return (
      <div
        className="CoverBackground"
        ref={ref => {
          this.element = ref;
        }}
      >
        <BackgroundSvg
          className="HeroSVG"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    );
  }
}

export default FrontpageHero;
