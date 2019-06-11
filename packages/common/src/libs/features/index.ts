import { hasTouch } from '@ussu/common/src/libs/features/hasTouch';

const features = {
  touch: hasTouch,
};

export function addClassesForFeatures() {
  Object.entries(features).forEach(([name, detection]) =>
    document.body.classList.add(`feature-${detection() ? '' : 'no-'}${name}`),
  );
}
