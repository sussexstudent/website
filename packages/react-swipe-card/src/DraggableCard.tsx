import React, { useReducer, useEffect, useCallback } from 'react';
import Hammer from 'hammerjs';
import { SimpleCard } from './SimpleCard';
import { Direction } from './utils';
import {
  Position,
  CardOutActions,
  CardRenderProp,
  StyleTransformer,
} from './types';

export interface DraggableCardProps extends CardOutActions {
  index: number;
  containerSize: Position;

  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
  onSwipeBottom?: () => void;
  onSwipeTop?: () => void;
  cardRef: any;
  styleTransformer: StyleTransformer;
  render: CardRenderProp;
}

interface DraggableCardState {
  x: number;
  y: number;
  initialPosition: Position;
  startPosition: Position;
  animation: null | boolean;
  pristine: boolean;
  activatedDirection?: Direction;
}

interface ResetAction {
  type: 'reset';
  payload: {
    initialPosition: Position;
  }
}

interface PanStartAction {
  type: 'panStart';
}

interface EnableAnimationAction {
  type: 'enableAnimation';
}

interface PanMoveAction {
  type: 'panMove';
  payload: {
    delta: Position;
    direction: Direction | undefined | false;
  }
}

type actionTypes = ResetAction | EnableAnimationAction | PanStartAction | PanMoveAction;

const reducer = (state: DraggableCardState, action: actionTypes): DraggableCardState => {
  switch(action.type) {
    case 'reset': {
      return {
        ...state,
        x: action.payload.initialPosition.x,
        y: action.payload.initialPosition.y,
        initialPosition: action.payload.initialPosition,
        startPosition: { x: 0, y: 0 }
      }
    }
    case 'enableAnimation': {
      return {
        ...state,
        animation: true,
      }
    }
    case 'panStart': {
      return {
        ...state,
        animation: false,
        startPosition: { x: state.x, y: state.y },
        pristine: false,
      }
    }
    case 'panMove': {
      return {
        ...state,
        activatedDirection: action.payload.direction || undefined,
        x: action.payload.delta.x + state.initialPosition.x,
        y: action.payload.delta.y + state.initialPosition.y,
      }
    }
    default: {
      return state;
    }
  }
};

export const DraggableCard: React.FC<DraggableCardProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    x: 0,
    y: 0,
    initialPosition: { x: 0, y: 0 },
    startPosition: { x: 0, y: 0 },
    animation: null,
    pristine: true,
    activatedDirection: undefined,
  });

  const { cardRef } = props;

  const resetPosition = useCallback(() => {
    const { x, y } = props.containerSize;
    const card = cardRef.current;

    if (!card) return;

    dispatch({type: 'reset', payload: {
      initialPosition: {
        x: Math.round((x - card.offsetWidth) / 2),
        y: Math.round((y - card.offsetHeight) / 2),
      }
    }});
  }, [cardRef, props.containerSize]);

  const getDirection = useCallback(() => {
    const screen = props.containerSize;
    const card = cardRef.current;
    if (!card) return;
    
    const THRESHOLD = 50;

    console.log(state.x, state.y);

    if (state.x < -THRESHOLD) {
      return Direction.Left;
    } else if (state.x + (card.offsetWidth - THRESHOLD) > screen.x) {
      return Direction.Right;
    } else if (state.y < -THRESHOLD) {
      return Direction.Top;
    } else if (state.y + (card.offsetHeight - THRESHOLD) > screen.y) {
      return Direction.Bottom;
    }
    
    return false;
  }, [cardRef, props.containerSize, state.x, state.y]);

  const panstart = (): void => {
    dispatch({ type: 'panStart' })
  };

  const panend = (ev: HammerInput): void => {
    const direction = getDirection();
    const {
      index,

      onSwipeRight,
      onSwipeLeft,
      onSwipeBottom,
      onSwipeTop,

      onOutScreenRight,
      onOutScreenLeft,
      onOutScreenBottom,
      onOutScreenTop,
    } = props;

    switch (direction) {
      case Direction.Right: {
        if (onSwipeRight) {
          onSwipeRight();
          onOutScreenRight(index);
        }
        break;
      }
      case Direction.Left: {
        if (onSwipeLeft) {
          onSwipeLeft();
          onOutScreenLeft(index);
        }
        break;
      }
      case Direction.Top: {
        if (onSwipeTop) {
          onSwipeTop();
          onOutScreenTop(index);
        }
        break;
      }
      case Direction.Bottom: {
        if (onSwipeBottom) {
          onSwipeBottom();
          onOutScreenBottom(index);
        }
        break;
      }
      default: {
        resetPosition();
        dispatch({ type: 'enableAnimation' });
        break;
      }
    }
  };

  const panmove = (ev: HammerInput): void => {
    const direction = getDirection();
    dispatch({
      type: 'panMove',
      payload: {
        delta: { x: ev.deltaX, y: ev.deltaY},
        direction,
      }
    })
  };

  const pancancel = (ev: HammerInput): void => {
    console.log('pancancel');
  };

  const handlePan = (ev: HammerInput): void => {
    ev.preventDefault();
    console.log(ev.type);
    switch (ev.type) {
      case 'panmove': return panmove(ev);
      case 'pancancel': return pancancel(ev);
      case 'panend': return panend(ev);
      case 'panstart': return panstart();
    }
  };

  const handleSwipe = (ev: HammerInput): void => {
    console.log(ev.type);
  };

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    const hammer = new Hammer.Manager(card);
    hammer.add(new Hammer.Pan({ threshold: 2 }));

    hammer.on('panstart panend pancancel panmove', handlePan);
    hammer.on(
      'swipestart swipeend swipecancel swipemove',
      handleSwipe,
    );

    resetPosition();
    window.addEventListener('resize', resetPosition);

    return () => {
      if (hammer) {
        hammer.stop(false);
        hammer.destroy();
      }
      window.removeEventListener('resize', resetPosition);
    }
  }, [cardRef, handlePan, handleSwipe, resetPosition]);

  const { x, y, animation, pristine, startPosition, activatedDirection } = state;
  const style = props.styleTransformer({ x, y }, startPosition);
  return (
    <SimpleCard
      cardRef={cardRef}
      {...props}
      style={style}
      shouldTransition={!!animation}
      isPristine={pristine}
      activatedDirection={activatedDirection}
    />
  );

};
