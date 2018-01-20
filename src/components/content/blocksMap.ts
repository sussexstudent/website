import { StreamFieldBlock } from '~components/content/types';

import { Heading } from '~components/content/blocks/Heading';
import { HeadingHeroBlock } from '~components/content/blocks/HeadingHeroBlock';
import { SelectionGridBlock } from '~components/content/blocks/SelectionGridBlock';
import StaffList from '~components/StaffList';
import { Paragraph } from '~components/content/blocks/Paragraph';
import { ExternalLink, InternalLink } from '~components/content/blocks/Links';
import { ImageBlock } from '~components/content/blocks/Image';
import { ButtonGroupBlock } from '~components/content/blocks/ButtonGroup';

interface BlockComponentMap {
  [blockName: string]: StreamFieldBlock<any>; // todo
}

export default {
  heading: Heading,
  heading_hero: HeadingHeroBlock,
  selection_grid: SelectionGridBlock,
  paragraph: Paragraph,
  text: Paragraph,
  image: ImageBlock,
  button_group_links: ButtonGroupBlock,
  staff_list: StaffList,
  external_link: ExternalLink,
  internal_link: InternalLink,
} as BlockComponentMap;
