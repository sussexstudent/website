import React from 'react';
import {StreamFieldBlock} from '@ussu/common/src/types/content';
import {TextBlockData} from '@ussu/website/src/pages/content/blocks/TextBlock';
import {HTML} from '../../../components/HTML';

export const TextBlock: StreamFieldBlock<TextBlockData> = ({block}) => {
  return <HTML html={block.value} />;
};
