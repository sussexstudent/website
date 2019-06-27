import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Position, StyleTransformer, RenderContainerProps } from './types';
import { Direction, defaultStyleTransformer } from './utils';
import { CardProps } from './Card';
import { CardPassthrough } from './CardPassthrough';

interface CardDeckProps {
  onEnd?(): void;
  className?: string;
  children: React.ReactElement<CardProps>[];
  styleTransformer?: StyleTransformer;
  renderContainer(props: RenderContainerProps): any;
}

interface CardDeckState {
  index: number;
  containerSize: Position;
}

export const CardDeck: React.FC<CardDeckProps> = (props) => {
  const [state, setState] = useState<CardDeckState>({
    index: 0,
    containerSize: { x: 0, y: 0 },
  });

  const handleRemoveCard = useCallback((side: Direction) => {
    const { children, onEnd } = props;

    if (
      Array.isArray(children) &&
      children.length === state.index + 1 &&
      onEnd
    ) {
      onEnd();
    }

    setState({
      ...state,
      index: state.index + 1,
    });
  }, [state, props]);

  const containerRef = useRef<HTMLElement>(null);

  const setSize = useCallback(() => {
    if (containerRef.current == null) return;

    const containerSize = {
      x: containerRef.current.offsetWidth,
      y: containerRef.current.offsetHeight,
    };

    setState({ ...state, containerSize });
  }, [state]);

  useEffect(() => {
    setSize();
    window.addEventListener('resize', setSize);

    return () => {
      window.removeEventListener('resize', setSize);

    }
  }, [setSize]);


  const { index, containerSize } = state;
  const { children, styleTransformer, renderContainer } = props;

  if (!Array.isArray(children) || !containerSize.x || !containerSize.y) {
    return renderContainer({ isEmpty: true, children: null, ref: containerRef });
  }

  const _cards = (children as React.ReactElement<CardProps>[])
    .slice(index, index + 2)
    .map((card: React.ReactElement<CardProps>, index: number) => (
      <CardPassthrough
        key={card.props.id}
        containerSize={containerSize}
        index={card.props.id}
        onOutScreenTop={() => handleRemoveCard(Direction.Top)}
        onOutScreenBottom={() => handleRemoveCard(Direction.Bottom)}
        onOutScreenLeft={() =>handleRemoveCard(Direction.Left)}
        onOutScreenRight={() => handleRemoveCard(Direction.Right)}
        active={index === 0}
        styleTransformer={styleTransformer || defaultStyleTransformer}
        {...card.props}
      />
    ));

  return renderContainer({ isEmpty: _cards.length > 0, children: _cards, ref: containerRef });
};
