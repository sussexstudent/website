import React from 'react';
import AlertIcon from '@ussu/common/src/icons/alert-circle.svg';
import {StreamFieldBlock} from '@ussu/common/src/types/content';
import {AlertTextBlockData} from '@ussu/website/src/pages/content/blocks/AlertText';
import {View} from 'react-native';
import {HTML} from '../../../../components/HTML';

export const AlertTextBlock: StreamFieldBlock<AlertTextBlockData> = ({
  block: {value},
}) => {
  return (
    <View style={{flexDirection: 'row', flexShrink: 1}}>
      <View style={{marginRight: 16}}>
        <AlertIcon width={48} height={48} />
      </View>

      <HTML html={value} style={{flexShrink: 1, marginBottom: 16}} />
    </View>
  );
};
