import React from 'react';
import { Layout } from '@ussu/common/src/types/slates';

interface Props {
  layout: Layout;
  areas: any;
}

export const AreasMap = {
  [Layout.Single]: 1,
  [Layout.TwoHalves]: 2,
  [Layout.TwoThirdsOne]: 2,
  [Layout.SplashImpulse]: 4,
};

export const SlateLayout: React.FC<Props> = ({ layout, areas }) => {
  switch (layout) {
    case Layout.Single:
      return <div className="Trail__row">{areas[0]}</div>;

    case Layout.TwoHalves:
      return (
        <div className="Trail__row Trail__row--11">
          {areas[0]}
          {areas[1]}
        </div>
      );
    case Layout.TwoThirdsOne:
      return (
        <div className="Trail__row Trail__row--21">
          {areas[0]}
          {areas[1]}
        </div>
      );
    case Layout.SplashImpulse:
      return (
        <React.Fragment>
          <div className="Trail__row">{areas[0]}</div>
          <div className="Trail__row Trail__row--111">
            {areas[1]}
            {areas[2]}
            {areas[3]}
          </div>
        </React.Fragment>
      );
  }
};
