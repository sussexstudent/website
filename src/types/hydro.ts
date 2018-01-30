export enum Provider {
  Apollo = 1,
  Router = 2,
}

export interface ContextToPropsMap {
  [contextName: string]: string;
}

export interface HydroLeafOptions {
  contextToProps?: ContextToPropsMap;
  className?: string;
  name?: string;
  container?(props: any): any;
  disableSSR?: boolean;
  providers?: Provider[];
}
