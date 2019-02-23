export enum Layout {
  Single,
  TwoHalves,
  TwoThirdsOne,
}

export enum BoxType {
  NA = 'na',
  ImpulseButton = 'impulsebutton',
  SimpleBranded = 'simplebranded',
  SimpleText = 'simpletext',
  VoteNow = 'votenow',
}

export interface InternalBox {
  type: BoxType;
  data: any;
}

export type InternalArea = InternalBox[];

export interface InternalSlateData {
  layout: Layout;
  areas: InternalArea[];
}

export interface InternalSlate {
  data: InternalSlateData;
  displayFrom: string;
  id: number;
  slateId: number;
}

export interface SlateBox {
  component: any;
  displayName: string;
  category: string;
  schema: any;
  uiSchema: any;
}
