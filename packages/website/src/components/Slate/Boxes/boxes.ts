import { SlateBoxImpulseButton } from './ImpulseButton';
import { SlateBoxSimpleBranded } from './SimpleBranded';
import { BoxType } from '@ussu/common/src/types/slates';
import { SlateBoxEmpty } from './Empty';
import { SlateBoxVoteNow } from './VoteNow';
import { mapValues } from 'lodash';
import { SlateBoxSimpleText } from './SimpleText';
import { SlateBoxFreshers2019 } from './Freshers2019';

export const slateBoxes = {
  [BoxType.NA]: SlateBoxEmpty,
  [BoxType.ImpulseButton]: SlateBoxImpulseButton,
  [BoxType.SimpleBranded]: SlateBoxSimpleBranded,
  [BoxType.SimpleText]: SlateBoxSimpleText,
  [BoxType.VoteNow]: SlateBoxVoteNow,
  [BoxType.Freshers2019]: SlateBoxFreshers2019,
};

const boxMap = mapValues(slateBoxes, (box) => box.component);

export function getAreaBox(boxType: BoxType): React.FC {
  return boxMap.hasOwnProperty(boxType) ? boxMap[boxType] : boxMap[BoxType.NA];
}
