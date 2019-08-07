import React, { useCallback } from 'react';
import { css } from '@emotion/core';
import { COLORS } from '@ussu/common/src/libs/style';
import { type, Typeface, TypeSize } from '@ussu/common/src/libs/style/type';

enum FalmerAPIOptions {
  Production = 'production',
  Local = 'local',
}

const api =
  localStorage.getItem('falmerEndpoint') === 'https://falmer.sussexstudent.com'
    ? FalmerAPIOptions.Production
    : FalmerAPIOptions.Local;
export const CompOptionsPanel: React.FC = () => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as FalmerAPIOptions;
    if (value === FalmerAPIOptions.Local) {
      localStorage.setItem('falmerEndpoint', 'http://localhost:8000');
    } else {
      localStorage.setItem(
        'falmerEndpoint',
        'https://falmer.sussexstudent.com',
      );
    }

    window.location.reload();
  }, []);

  return (
    <div
      css={css({
        position: 'fixed',
        bottom: 0,
        left: 0,
        padding: '0.1rem',
        background: 'rgba(30, 30, 30, 0.8)',
        opacity: 0.6,
        color: COLORS.WHITE,
        textShadow: '1px 0 2px rgba(30, 30, 30, 0.6)',
        '&:hover .content': {
          display: 'block',
          paddingBottom: '1rem',
        },
        '& .content': {
          display: 'none',
        },
      })}
    >
      <div className="content">
        <div>
          Falmer API
          <div>
            <label htmlFor="apiFalmer">Production</label>
            <input
              onChange={handleChange}
              type="radio"
              name="api"
              value={FalmerAPIOptions.Production}
              checked={api === FalmerAPIOptions.Production}
            />
          </div>
          <div>
            <label htmlFor="apiFalmer">Local</label>
            <input
              onChange={handleChange}
              type="radio"
              name="api"
              value={FalmerAPIOptions.Local}
              checked={api === FalmerAPIOptions.Local}
            />
          </div>
        </div>
      </div>
      <span css={{ ...type(TypeSize.Minion, Typeface.Secondary) }}>
        Falmer API: {api}
      </span>
    </div>
  );
};
