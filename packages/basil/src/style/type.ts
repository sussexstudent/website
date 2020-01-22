import { omit } from 'lodash';
import { TYPE_PRIMARY, TYPE_SECONDARY } from './index';
import { Group, SizeDef, sizes, Typeface, TypeSize } from './typeSizes';

export { Typeface, TypeSize };

export function type(
  typeSize: TypeSize,
  typeface?: Typeface,
  withoutLineHeight = false,
  isHighlight = false,
) {
  if (!sizes.hasOwnProperty(typeSize)) {
    console.warn(`[css] "${typeSize}" isn't a font size.`);
    return { color: 'red !important' };
  }

  const keysToRemove: string[] = [];

  if (withoutLineHeight) {
    keysToRemove.push('lineHeight');
  }

  const process = (map: any) => {
    let processedMap = map;
    processedMap = omit(processedMap, keysToRemove);

    if (isHighlight && Object.hasOwnProperty.call(processedMap, 'fontSize')) {
      processedMap['lineHeight'] = processedMap['fontSize'];
    }

    return processedMap;
  };

  const size: SizeDef = sizes[typeSize];

  const fontMap = process(sizes[typeSize][Group.A]);

  if (size.hasOwnProperty(Group.B)) {
    fontMap['@media screen and (min-width: 320px)'] = process(
      sizes[typeSize][Group.B],
    );
  }

  if (size.hasOwnProperty(Group.D)) {
    fontMap['.feature-no-touch &'] = process(sizes[typeSize][Group.D]);
  }

  if (typeface) {
    fontMap['fontFamily'] =
      typeface === Typeface.Secondary ? TYPE_SECONDARY : TYPE_PRIMARY;
  }

  return fontMap;
}
