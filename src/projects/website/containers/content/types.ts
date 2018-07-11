export interface Page<D = null> {
  title: string;
  slug: string;
  path: string;
  data: D;
}

export type StreamFieldBlock<B> = React.SFC<{ page: Page; block: B }>;

export interface StreamFieldBlockData<B = any> {
  id: any;
  type: string;
  value: B;
}

export type StreamFieldData = StreamFieldBlockData[];
