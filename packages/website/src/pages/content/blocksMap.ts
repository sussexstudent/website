import { Heading } from './blocks/Heading';
import { HeadingHeroBlock } from './blocks/HeadingHeroBlock';
import { SelectionGridBlock } from './blocks/SelectionGridBlock';
import { StaffList } from '../../components/StaffList';
import { TextBlock } from './blocks/TextBlock';
import { DocumentLink, ExternalLink, InternalLink } from './blocks/Links';
import { ImageBlock } from './blocks/Image';
import { ButtonGroupBlock } from './blocks/ButtonGroup';
import { StartButtonBlock } from './blocks/StartButton';
import { AlertTextBlock } from './blocks/AlertText';
import { Pledge } from './blocks/Pledge';
import { ProfileSlice, TwoColSlice } from './blocks/Freshers';
import { BlockComponentMap } from '@ussu/common/src/libs/content/blocks';

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
