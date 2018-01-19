import React from 'react';
import {StreamFieldBlock} from "~components/content/types";

export const Paragraph: StreamFieldBlock<{ value: string }> = ({ block: { value } }) => {
  return (
    <div className="Prose" dangerouslySetInnerHTML={{ __html: value }} />
  )
};
