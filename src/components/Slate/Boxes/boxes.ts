import { SlateBoxImpulseButton } from '~components/Slate/Boxes/ImpulseButton';
import { SlateBoxSimpleBranded } from '~components/Slate/Boxes/SimpleBranded';
import { BoxType } from '~types/slates';
import { SlateBoxEmpty } from '~components/Slate/Boxes/Empty';
import { SlateBoxVoteNow } from '~components/Slate/Boxes/VoteNow';
import { mapValues } from 'lodash';
import { SlateBoxSimpleText } from '~components/Slate/Boxes/SimpleText';

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
