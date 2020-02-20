import {BlockComponentMap} from '@ussu/common/src/libs/content/blocks';
import {MissingBlock} from './blocks/MissingBlock';
import {TextBlock} from './blocks/TextBlock';
import {AlertTextBlock} from './blocks/AlertText';
import {InsetTextBlock} from './blocks/AlertText/InsetText';
import {ImageBlock} from './blocks/Image';
import {DocumentLink, ExternalLink, InternalLink} from './blocks/Links';
import {ButtonGroupBlock} from './blocks/ButtonGroup';

// These keys are from Wagtail, so we use snake case
/* eslint-disable @typescript-eslint/camelcase */
export const blockComponentNativeMap: BlockComponentMap = {
  heading: MissingBlock,
  heading_hero: MissingBlock,
  selection_grid: MissingBlock,
  paragraph: MissingBlock,
  start_button: MissingBlock,
  staff_list: MissingBlock,
  pledge: MissingBlock,
  profile_slice_component: MissingBlock,
  two_slice_component: MissingBlock,

  button_group_links: ButtonGroupBlock,
  text: TextBlock,
  image: ImageBlock,
  alert_text: AlertTextBlock,
  inset_text: InsetTextBlock,
  external_link: ExternalLink,
  document_link: DocumentLink,
  internal_link: InternalLink,
};
