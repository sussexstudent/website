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
  [componentType: string]: React.SFC<{ value: any; document: CMSDocument }>;
}
