import React from 'react';
import { Image, Linking } from 'react-native';
import HTML from 'react-native-render-html';

export default function HTMLContentRenderer({ content }) {
  const tagsStyles = {
    p: { lineHeight: 60 },
    h1: { backgroundColor: '#FF0000' },
    h2: { fontFamily: 'Arial' },
    img: { resizeMode: 'cover' },
  };
  const classesStyles = {
    prose: { lineHeight: 60 },
  };
  const renderers = {
    img: (htmlAttribs, children, passProps) => (
      <Image
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
      onLinkPress={(evt, href) => Linking.openURL(href)}
      renderers={renderers}
    />
  );
}
