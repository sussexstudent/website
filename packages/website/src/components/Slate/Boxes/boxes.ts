import { SlateBoxImpulseButton } from './ImpulseButton';
import { SlateBoxSimpleBranded } from './SimpleBranded';
import {BoxType} from '@ussu/common/src/types/slates';
import { SlateBoxEmpty } from './Empty';
import { SlateBoxVoteNow } from './VoteNow';
import { mapValues } from 'lodash';
import { SlateBoxSimpleText } from './SimpleText';

export const slateBoxes = {
  [BoxType.NA]: SlateBoxEmpty,
  [BoxType.ImpulseButton]: SlateBoxImpulseButton,
  [BoxType.SimpleBranded]: SlateBoxSimpleBranded,
  [BoxType.SimpleText]: SlateBoxSimpleText,
  [BoxType.VoteNow]: SlateBoxVoteNow,
};

const boxMap = mapValues(slateBoxes, (box) => box.component);

export function getAreaBox(boxType: BoxType) {
  return boxMap.hasOwnProperty(boxType) ? boxMap[boxType] : boxMap[BoxType.NA];
}
