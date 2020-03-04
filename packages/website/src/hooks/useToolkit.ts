interface DataMap {
  Content: {
    id: number;
    contentType: string;
  },
  Event: {
    id?: number;
  },
  EventBrand: {
    id?: number;
  }
}


export const useToolkit = <N extends keyof DataMap>(name: N, data: DataMap[N]) => {
  (window as any).USSU_TOOLKIT_DATA = {name, data};
};
