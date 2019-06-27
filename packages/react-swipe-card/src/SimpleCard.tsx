import React, {useCallback, useEffect, useState} from 'react';
import { Position, CardRenderProp, StyleTransformer } from './types';
import { Direction } from './utils';

export interface SimpleCardProps {
  containerSize: Position;
  className?: string;
  index: number;
  style?: React.CSSProperties;
  render: CardRenderProp;
  styleTransformer: StyleTransformer;
  shouldTransition?: boolean;
  isPristine?: boolean;
  activatedDirection?: Direction
  cardRef: any; // todo
}

interface SimpleCardState {
  initialPosition: Position;
}

export const SimpleCard: React.FC<SimpleCardProps> = (props) => {
  const [state, setState ] = useState<SimpleCardState>({ initialPosition: { x: 0, y: 0 } });

  const setInitialPosition = useCallback((): void => {
    const initialPosition = {
      x: Math.round((props.containerSize.x - props.cardRef.current.offsetWidth) / 2),
      y: Math.round((props.containerSize.y - props.cardRef.current.offsetHeight) / 2),
    };
    setState({ initialPosition });
  }, [props.cardRef, props.containerSize.x, props.containerSize.y]);

  useEffect(() => {
    setInitialPosition();
    window.addEventListener('resize', setInitialPosition);

    return () => {
      window.removeEventListener('resize', setInitialPosition);
    };
  }, [setInitialPosition]);

  const { initialPosition } = state;
  const { styleTransformer, shouldTransition, isPristine } = props;
  var style = {
    ...styleTransformer(initialPosition, initialPosition),
    zIndex: 10 - props.index,
    ...props.style,
  };

  return props.render({
    ref: props.cardRef,
    style,
    shouldTransition: shouldTransition ? true : false,
    activatedDirection: props.activatedDirection,
    isPristine:
      isPristine === undefined || isPristine === true ? true : false,
  });
};
