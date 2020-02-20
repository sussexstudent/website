import React from 'react';
import StreamField from '../StreamField';
import {
  DocumentLinkBlockData,
  ExternalLinkBlockData,
  InternalLinkBlockData,
} from './Links';
import {
  StreamFieldBlock,
  StreamFieldBlockData,
} from '@ussu/common/src/types/content';
import {View} from 'react-native';

export type ButtonGroupBlockData = StreamFieldBlockData<
  'button_group_links',
  (ExternalLinkBlockData | InternalLinkBlockData | DocumentLinkBlockData)[]
>;

export const ButtonGroupBlock: StreamFieldBlock<ButtonGroupBlockData> = ({
  page,
  block,
}) => {
  return (
    <View>
      <StreamField
        page={page}
        items={block}
        renderItem={({children, key}) => <View key={key}>{children}</View>}
      />
    </View>
  );
};
