import { COLORS, Layers, MQSizes } from './index';

export function generateCssOut() {
  const colorsOut = `:root {
${Object.entries(COLORS)
  .map(([name, hex]) => `  --color-${name}: ${hex};`)
  .join('\n')}
  }
  `;

  const layersOut = `:root {
${Object.keys(Layers)
  .filter((key) => !isNaN(Number(Layers[key as any])))
  .map((name) => `  --layer-${name}: ${Layers[name as any]};`)
  .join('\n')}
}`;

  const mqOut = MQSizes.map(
    ([name, size]) => `@custom-media --${name} (width > ${size}px)`,
  ).join('\n');

  return [colorsOut, layersOut, mqOut].join('\n\n');
}
