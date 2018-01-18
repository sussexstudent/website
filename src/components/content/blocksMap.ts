import {StreamFieldBlock} from "~components/content/types";

import {Heading} from "~components/content/blocks/Heading";
import {HeadingHeroBlock} from "~components/content/blocks/HeadingHeroBlock";
import {SelectionGridBlock} from "~components/content/blocks/SelectionGridBlock";
import StaffList from "~components/StaffList";

interface BlockComponentMap {
  [blockName: string]: StreamFieldBlock<any>; // todo
}

export default {
  'heading': Heading,
  'heading_hero': HeadingHeroBlock,
  'selection_grid': SelectionGridBlock,
  'staff_list': StaffList,
} as BlockComponentMap;
