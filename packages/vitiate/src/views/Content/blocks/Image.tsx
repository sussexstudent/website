import React from 'react';
import {
  StreamFieldBlock,
  StreamFieldBlockData,
} from '@ussu/common/src/types/content';
import {View, Text} from 'react-native';
import {FalmerImage as FIType} from '@ussu/common/src/types/events';
import {FalmerImage} from '../../../components/FalmerImage';

export type ImageBlockData = StreamFieldBlockData<
  'image',
  {
    caption: string;
    alternativeTitle: string;
    image: FIType;
  }
>;

export const ImageBlock: StreamFieldBlock<ImageBlockData> = ({
  block: {caption, image, alternativeTitle},
}) => {
  return (
    <View>
      <FalmerImage image={image} width={320} />
      <Text>{caption}</Text>
    </View>
  );
};
