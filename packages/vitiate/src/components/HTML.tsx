import React from 'react';
import HTMLComp from 'react-native-render-html';
import {Text} from 'react-native';

interface HTMLProps {
  html: string;
  style: any;
}

const defaultText = {
  fontSize: 18,
  lineHeight: 32,
};

const styles = {
  p: defaultText,
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink,
    ...defaultText,
  },
  li: {
    ...defaultText,
    paddingBottom: 8,
  },
};

const renderers = {
  p: ({children}) => (children ? Text : null),
};

export const HTML: React.FC<HTMLProps> = ({html, style}) => (
  <HTMLComp
    containerStyle={style}
    html={html}
    tagsStyles={styles}
    renders={renderers}
  />
);
