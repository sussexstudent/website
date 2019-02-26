import React from 'react';
import { HoverTapTooltip } from '~components/HoverTapToolTip';
import { InternalAppLink } from '~components/InternalAppLink';

interface AwardProps {
  color: string;
  title: string;
  link: string;
  subtitle: string;
  description: string;
  children: React.ReactNode;
}

export const Award: React.FC<AwardProps> = (props) => {
  const inner = (
    <React.Fragment>
      <div className="Award__disc" style={{ backgroundColor: props.color }}>
        {props.children}
      </div>
      <div className="Award__title type-pica">{props.title}</div>
      <div className="Award__subtitle type-minion">{props.subtitle}</div>
    </React.Fragment>
  );
  return (
    <HoverTapTooltip content={() => <span>{props.description}</span>}>
      {({ handleClose, handleOpen, ref }) =>
        props.link === '' ? (
          <div
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            ref={ref}
            className="Award"
            style={{ color: props.color }}
          >
            {inner}
          </div>
        ) : (
          <InternalAppLink
            to={props.link}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            ref={ref}
            className="Award"
            style={{ color: props.color }}
          >
            {inner}
          </InternalAppLink>
        )
      }
    </HoverTapTooltip>
  );
};
