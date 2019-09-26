import { Heading, HeadingBlockData } from './blocks/Heading';
import {
  HeadingHeroBlock,
  HeadingHeroBlockData,
} from './blocks/HeadingHeroBlock';
import {
  SelectionGridBlock,
  SelectionGridItemData,
} from './blocks/SelectionGridBlock';
import { StaffList, StaffListBlockData } from '../../components/StaffList';
import { TextBlock, TextBlockData } from './blocks/TextBlock';
import {
  DocumentLink,
  DocumentLinkBlockData,
  ExternalLink,
  ExternalLinkBlockData,
  InternalLink,
  InternalLinkBlockData,
} from './blocks/Links';
import { ImageBlock, ImageBlockData } from './blocks/Image';
import { ButtonGroupBlock, ButtonGroupBlockData } from './blocks/ButtonGroup';
import { StartButtonBlock, StartButtonBlockData } from './blocks/StartButton';
import { AlertTextBlock, AlertTextBlockData } from './blocks/AlertText';
import { Pledge, PledgeBlockData } from './blocks/Pledge';
import {
  ProfileSlice,
  ProfileSliceData,
  TwoColSlice,
  TwoColSliceData,
} from './blocks/Freshers';

export type AllBlocks =
  | HeadingBlockData
  | HeadingHeroBlockData
  | SelectionGridItemData
  | TextBlockData
  | ImageBlockData
  | StartButtonBlockData
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
// These keys are from Wagtail, so we use snake case
/* eslint-disable @typescript-eslint/camelcase */
const blockComponentMap: BlockComponentMap = {
  heading: Heading,
  heading_hero: HeadingHeroBlock,
  selection_grid: SelectionGridBlock,
  paragraph: TextBlock,
  text: TextBlock,
  image: ImageBlock,
  start_button: StartButtonBlock,
  alert_text: AlertTextBlock,
  button_group_links: ButtonGroupBlock,
  staff_list: StaffList,
  external_link: ExternalLink,
  document_link: DocumentLink,
  internal_link: InternalLink,
  pledge: Pledge,
  profile_slice_component: ProfileSlice,
  two_slice_component: TwoColSlice,
};

export default blockComponentMap;
