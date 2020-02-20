declare function HtmrTransform(
  node: any,
  props: any,
  children: React.ReactChildren,
): React.ReactNode;

declare interface HtmrTransformMap {
  [elementName: string]: React.FC<React.AllHTMLAttributes<any>>;
  _?(node: any, props: any, children: React.ReactChildren): React.ReactNode;
}

declare interface HtmrOptions {
  transform?: HtmrTransformMap;
  preserveAttributes?: (string | RegExp)[];
}

declare function htmr(
  html: string,
  options?: HtmrOptions,
): React.ReactElement<any>[];

declare module 'htmr' {
  export = htmr;
}
