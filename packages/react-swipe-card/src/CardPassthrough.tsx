import React, { createElement, useRef } from 'react';

import { SimpleCard, SimpleCardProps } from './SimpleCard';
import { DraggableCard, DraggableCardProps } from './DraggableCard';
import { StyleTransformer } from './types';

interface Props {
  active?: boolean;
  styleTransformer: StyleTransformer;
}

type CardPassthroughProps = Props &
  Omit<SimpleCardProps, 'cardRef'> &
  Omit<DraggableCardProps, 'cardRef'>;

export const CardPassthrough: React.FC<CardPassthroughProps> = ({
  active = false,
  ...props
}) => {
  const cardRef = useRef<HTMLElement>(null);
  return active
    ? createElement(DraggableCard, { ...props, cardRef } as DraggableCardProps)
    : createElement(SimpleCard, { ...props, cardRef } as SimpleCardProps);
};
