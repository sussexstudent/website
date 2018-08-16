export interface ContextToPropsMap {
  [contextName: string]: string;
}

export interface HydroLeafOptions {
  contextToProps?: ContextToPropsMap;
  className?: string;
  name?: string;
  container?(props: any): any;
  disableSSR?: boolean;
}
