import {StreamFieldBlock} from "~components/content/types";

import {HeadingHeroBlock} from "~components/content/blocks/HeadingHeroBlock";
import {SelectionGridBlock} from "~components/content/blocks/SelectionGridBlock";

interface BlockComponentMap {
  [blockName: string]: StreamFieldBlock<any>; // todo
}

export default {
  'heading_hero': HeadingHeroBlock,
  'selection_grid': SelectionGridBlock,
} as BlockComponentMap;
