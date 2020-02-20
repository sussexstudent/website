import { HeadingBlockData } from '@ussu/website/src/pages/content/blocks/Heading';
import { HeadingHeroBlockData } from '@ussu/website/src/pages/content/blocks/HeadingHeroBlock';
import { SelectionGridItemData } from '@ussu/website/src/pages/content/blocks/SelectionGridBlock';
import { TextBlockData } from '@ussu/website/src/pages/content/blocks/TextBlock';
import { ImageBlockData } from '@ussu/website/src/pages/content/blocks/Image';
import { StartButtonBlockData } from '@ussu/website/src/pages/content/blocks/StartButton';
import { AlertTextBlockData } from '@ussu/website/src/pages/content/blocks/AlertText';
import { ButtonGroupBlockData } from '@ussu/website/src/pages/content/blocks/ButtonGroup';
import { StaffListBlockData } from '@ussu/website/src/components/StaffList';
import {
  DocumentLinkBlockData,
  ExternalLinkBlockData,
  InternalLinkBlockData,
} from '@ussu/website/src/pages/content/blocks/Links';
import { PledgeBlockData } from '@ussu/website/src/pages/content/blocks/Pledge';
import {
  ProfileSliceData,
  TwoColSliceData,
} from '@ussu/website/src/pages/content/blocks/Freshers';

export type AllBlocks =
  | HeadingBlockData
  | HeadingHeroBlockData
  | SelectionGridItemData
  | TextBlockData
  | ImageBlockData
  | AlertTextBlockData
  | StartButtonBlockData
  | ButtonGroupBlockData
  | StaffListBlockData
  | ExternalLinkBlockData
  | InternalLinkBlockData
  | DocumentLinkBlockData
  | PledgeBlockData
  | ProfileSliceData
  | TwoColSliceData;

export interface BlockComponentMap {
  [blockName: string]: any; // todo
}
