export interface Page<S = null> {
  title: string;
  slug: string;
  path: string;
  subPages: S;
}

export type StreamFieldBlock<B> = React.SFC<{ page: Page; block: B }>;

export interface StreamFieldBlockData<B = any> {
  id: any;
  type: string;
  value: B;
}

export type StreamFieldData = StreamFieldBlockData[];

export interface ContentBrowserPage {
  title: string;
  contentType: string;
  path: string;
  slug: string;
  searchDescription: string;
  subPages: ContentBrowserPage[];
}
