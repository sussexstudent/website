import React from 'react';
import { Image, Linking } from 'react-native';
import HTML, { RendererMap } from 'react-native-render-html';
import { colors } from '../vars';

interface HTMLContentRendererProps {
  content: string;
}

export const HTMLContentRenderer: React.SFC<HTMLContentRendererProps> = ({
  content,
}) => {
  const tagsStyles = {
    p: { lineHeight: 30, marginBottom: 20 },
    h1: { backgroundColor: '#FF0000' },
    h2: { fontFamily: 'Arial' },
    img: { resizeMode: 'cover' },
  };
  const classesStyles = {};
  const renderers: RendererMap = {
    img: (htmlAttribs, _children, passProps) => (
      <Image
        key={passProps.key}
        source={{ uri: htmlAttribs.src, width: 100, height: 100 }}
        {...passProps}
      />
    ),
  };

  return (
    <HTML
      html={`<div class="prose">${content}</div>`}
      classesStyles={classesStyles}
      tagsStyles={tagsStyles}
      baseFontStyle={{ lineHeight: 20, fontSize: 16, color: colors.greyWinter }}
      onLinkPress={(_evt, href) => Linking.openURL(href)}
      renderers={renderers}
    />
  );
};
