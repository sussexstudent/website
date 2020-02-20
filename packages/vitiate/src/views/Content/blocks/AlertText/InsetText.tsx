import React from 'react';
import {StreamFieldBlock} from '@ussu/common/src/types/content';
import {AlertTextBlockData} from '@ussu/website/src/pages/content/blocks/AlertText';
import {View} from 'react-native';
import {HTML} from '../../../../components/HTML';

export const InsetTextBlock: StreamFieldBlock<AlertTextBlockData> = ({
  block: {value},
}) => {
  return (
    <View style={{borderLeftColor: '#000', borderLeftWidth: 4, paddingLeft: 8}}>
      <HTML html={value} style={{flexShrink: 1, marginBottom: 16}} />
    </View>
  );
};
