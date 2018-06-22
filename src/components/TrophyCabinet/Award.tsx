import React from 'react';
import { HoverTapTooltip } from '~components/HoverTapToolTip';

interface AwardProps {
  color: string;
  title: string;
  subtitle: string;
  description: string;
  children: React.ReactNode;
}

export function Award(props: AwardProps) {
  return (
    <HoverTapTooltip content={() => <span>{props.description}</span>}>
      {({ handleClose, handleOpen, ref }) => (
        <div
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          ref={ref}
          className="Award"
          style={{ color: props.color }}
        >
          <div className="Award__disc" style={{ backgroundColor: props.color }}>
            {props.children}
          </div>
          <div className="Award__title type-pica">{props.title}</div>
          <div className="Award__subtitle type-minion">{props.subtitle}</div>
        </div>
      )}
    </HoverTapTooltip>
  );
}
