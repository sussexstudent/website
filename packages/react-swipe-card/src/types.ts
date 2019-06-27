import { Direction } from './utils';
import React from 'react';

export interface Position {
  x: number;
  y: number;
}

export interface CardOutActions {
  onOutScreenRight: (index: number) => void;
  onOutScreenLeft: (index: number) => void;
  onOutScreenBottom: (index: number) => void;
  onOutScreenTop: (index: number) => void;
}

export interface RenderContainerProps {
  children: any;
  isEmpty: boolean;
  ref: React.RefObject<HTMLElement>; // todo
}

export interface CardRendererProps {
  style: any;
  isPristine: boolean;
  shouldTransition: boolean;
  activatedDirection?: Direction;
  ref: any; // todo
}

export type CardRenderProp = (props: CardRendererProps) => any; // todo

export type StyleTransformer = (
  currentPosition: Position,
  initialPosition: Position,
) => React.CSSProperties;
