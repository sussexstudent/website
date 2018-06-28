module 'react-native-render-html' {
  export interface RendererMap {
    [tagName: string]: (htmlAttribs: any, children: any, passProps: any) => any;
  }

  interface Props {
    html: string;
    classesStyles: any;
    tagsStyles: { [tagName: string]: any };
    baseFontStyle: any;
    onLinkPress(event: any, href: string): void;
    renderers?: RendererMap;
  }
  const component: React.SFC<Props> = () => {};
  export default component;
}
