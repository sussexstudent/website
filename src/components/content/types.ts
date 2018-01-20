export interface Page<D = null> {
  title: string;
  data: D;
}

export type StreamFieldBlock<B> = React.SFC<{ page: Page; block: B }>;

export interface StreamFieldBlockData<B = null> {
  id: any;
  type: string;
  value: B;
}

export type StreamFieldData = Array<StreamFieldBlockData>;
