import React from 'react';

interface AwardProps {
  color: string;
  title: string;
  subtitle: string;
  children: React.ReactNode
}

export function Award(props: AwardProps) {

  return (
    <div className="Award" style={{ color: props.color }}>
      <div className="Award__disc" style={{ backgroundColor: props.color }}>
        {props.children}
      </div>
      <div className="Award__title type-pica">{props.title}</div>
      <div className="Award__subtitle type-minion">{props.subtitle}</div>
    </div>
  );
}
