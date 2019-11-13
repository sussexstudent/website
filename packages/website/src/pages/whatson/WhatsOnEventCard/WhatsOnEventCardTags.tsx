import React from 'react';
import { EventTag, EventTagType } from './tags';
import { COLORS } from '@ussu/basil/src/style';

export const WhatsOnEventCardTags: React.FC<{ tags: EventTag[] }> = ({
  tags,
}) => (
  <ul
    css={{
      position: 'absolute',
      color: '#fff',
      fontWeight: 600,
      bottom: 6,
      left: 0,
      right: 0,
      fontSize: '0.7rem',
      margin: 0,
      padding: 0,
      listStyle: 'none',
      overflow: 'hidden',
      display: 'flex',
    }}
  >
    {tags.map((tag) => (
      <li
        key={tag.id}
        css={{
          padding: '0.1rem 0.3rem',
          marginLeft: 6,
          borderRadius: '10px',
          display: 'inline-block',
          flex: '0 0 auto',
          background:
            tag.type === EventTagType.Info
              ? COLORS.BRAND_BLUE
              : tag.type === EventTagType.Requirement
              ? COLORS.BRAND_RED
              : COLORS.BRAND_GREEN,
        }}
      >
        {tag.title}
      </li>
    ))}
  </ul>
);
