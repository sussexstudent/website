export interface ComponentBlock {
  type: string;
  value: any;
}

export interface ComponentData {
  body: any[]; // todo
}

export interface CMSDocument {
  title: string;
  body: any[];
}

export interface ComponentMap {
  [componentType: string]: React.FC<{ value: any; document: CMSDocument }>;
}

export interface PageComponentMap {
  [wagtailModel: string]: any; // todo
}

export interface Page<S = null> {
  title: string;
  slug: string;
  path: string;
  subPages: S;
  subPagesGeneric: Page[];

  lastPublishedAt: string;
}

export type StreamFieldBlock<
  B extends StreamFieldBlockData<string, unknown>
> = React.FC<{
  page: Page;
  block: B['value'];
  index: number;
}>;

export interface StreamFieldBlockData<T extends string, B> {
  id: string;
  type: T;
  value: B;
}

export type StreamFieldData = StreamFieldBlockData<any, any>[];

export interface ContentBrowserPage {
  title: string;
  contentType: string;
  path: string;
  slug: string;
  searchDescription: string;
  subPages: ContentBrowserPage[];
}

export interface FalmerFile {
  url: string;
}
