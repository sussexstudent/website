import { StreamFieldBlock } from '~website/containers/content/types';

import { Heading } from '~website/containers/content/blocks/Heading';
import { HeadingHeroBlock } from '~website/containers/content/blocks/HeadingHeroBlock';
import { SelectionGridBlock } from '~website/containers/content/blocks/SelectionGridBlock';
import StaffList from '~components/StaffList';
import { TextBlock } from '~website/containers/content/blocks/TextBlock';
import {
  DocumentLink,
  ExternalLink,
  InternalLink,
} from '~website/containers/content/blocks/Links';
import { ImageBlock } from '~website/containers/content/blocks/Image';
import { ButtonGroupBlock } from '~website/containers/content/blocks/ButtonGroup';
import { StartButtonBlock } from '~website/containers/content/blocks/StartButton';
import { AlertTextBlock } from '~website/containers/content/blocks/AlertText';

interface BlockComponentMap {
  [blockName: string]: StreamFieldBlock<any>; // todo
}

export default {
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
} as BlockComponentMap;
