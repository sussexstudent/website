import React, { useCallback } from 'react';
import { css } from '@emotion/core';
import { COLORS } from '@ussu/basil/src/style';

enum FalmerAPIOptions {
  Production = 'production',
  Staging = 'staging',
  Local = 'local',
}

const colorMap = {
  [FalmerAPIOptions.Production]: 'green',
  [FalmerAPIOptions.Staging]: 'orange',
  [FalmerAPIOptions.Local]: 'red',
};

const api =
  localStorage.getItem('falmerEndpoint') === 'https://falmer.sussexstudent.com'
    ? FalmerAPIOptions.Production
    : localStorage.getItem('falmerEndpoint') === 'http://localhost:8000'
    ? FalmerAPIOptions.Local
    : FalmerAPIOptions.Staging;
export const CompOptionsPanel: React.FC = () => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as FalmerAPIOptions;
    if (value === FalmerAPIOptions.Local) {
      localStorage.setItem('falmerEndpoint', 'http://localhost:8000');
    } else if (value === FalmerAPIOptions.Production) {
      localStorage.setItem(
        'falmerEndpoint',
        'https://falmer.sussexstudent.com',
      );
    } else {
      localStorage.setItem(
        'falmerEndpoint',
        'https://staging.falmer.sussexstudent.com',
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
        fontSize: '0.85rem',
        padding: '0.1rem',
        background: 'rgba(30, 30, 30, 0.8)',
        opacity: 0.6,
        fontFamily: 'monospace',
        color: COLORS.WHITE,
        textShadow: '1px 0 2px rgba(30, 30, 30, 0.6)',
        '&:hover .content': {
          display: 'block',
        },
        '& .content': {
          display: 'none',
          padding: '0.3rem 0.3rem 1rem 0.3rem',
        },
      })}
    >
      <div className="content">
        <div>
          Falmer API
          <div>
            <input
              onChange={handleChange}
              type="radio"
              name="api"
              value={FalmerAPIOptions.Production}
              checked={api === FalmerAPIOptions.Production}
            />
            <label htmlFor="apiFalmer">Production</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              type="radio"
              name="api"
              value={FalmerAPIOptions.Staging}
              checked={api === FalmerAPIOptions.Staging}
            />
            <label htmlFor="apiFalmer">Staging</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              type="radio"
              name="api"
              value={FalmerAPIOptions.Local}
              checked={api === FalmerAPIOptions.Local}
            />
            <label htmlFor="apiFalmer">Local</label>
          </div>
        </div>
      </div>
      <span>
        <div
          css={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: colorMap[api],
            float: 'left',
            marginRight: '0.75rem',
          }}
        />
        API: {api}
      </span>
    </div>
  );
};
