import React from 'react';
import {Image} from 'react-native';
import {Image as ImageType} from '@ussu/website/src/generated/graphql';

interface FalmerImageProps {
  image?: ImageType | null;
  width: number;
}

export const FalmerImage: React.FC<FalmerImageProps> = ({image, width}) => {
  return (
    <Image
      style={{
        width: width,
        height: width * ((image?.height ?? 80) / (image?.width ?? 160)),
        marginBottom: 12,
        borderRadius: 6,
        alignSelf: 'center',
      }}
      source={{
        uri: `https://su.imgix.net/${image?.resource ??
          'original_images/be978c42d61047d99d2facebda5f515e'}?w=${width}&h=${width *
          ((image?.height ?? 80) /
            (image?.width ?? 160))}&auto=format&q=80&fit=crop&crop=faces`,
      }}
    />
  );
};
