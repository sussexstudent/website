import React from 'react';
import { Image } from 'react-native';
import HTML from 'react-native-render-html';

export default function HTMLContentRenderer({ content }) {
  const styles = {
    h1: { backgroundColor: '#FF0000' },
    h2: { fontFamily: 'Arial' },
    img: { resizeMode: 'cover' },
  };

  const renderers = {
    img: (htmlAttribs, children, passProps) => (
      <Image
        source={{ uri: htmlAttribs.src, width: 100, height: 100 }}
        style={passProps.htmlStyles.img}
        {...passProps}
      />
    ),
  };

  return (
    <HTML
      html={content}
      htmlStyles={styles}
      onLinkPress={(evt, href) => console.log(href)}
      renderers={renderers}
    />
  );
}
