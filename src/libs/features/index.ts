import {hasTouch} from "~libs/features/hasTouch";


const features = {
  'touch': hasTouch,
};

export function addClassesForFeatures() {
  Object.entries(features).forEach(([name, detection]) => document.body.classList.add(`feature-${detection() ? '' : 'no-'}${name}`))
}
