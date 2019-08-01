import React from 'react';
import { cardActionable } from '@ussu/common/src/libs/style/cards';
import { type, Typeface, TypeSize } from '@ussu/common/src/libs/style/type';

export const LoginPage = () => {
  return (
    <div
      css={{
        textAlign: 'center',
      }}
    >
      <h1>Falmer</h1>
      <div
        css={[
          {
            textAlign: 'center',
            padding: '1rem',
            width: '80%',
            maxWidth: 400,
            margin: '2rem auto',
            borderRadius: 6,
          },
        ]}
      >
        <a
          css={[
            cardActionable,
            {
              display: 'block',
              verticalAlign: 'center',
              textDecoration: 'none',
              padding: '0.6rem',
              boxSizing: 'border-box',
              borderRadius: 6,
              background: '#fff',
              fontWeight: 600,
            },
            type(TypeSize.DoublePica, Typeface.Secondary),
          ]}
          href="https://sso.sussexstudent.com/start"
        >
          Log in with Google
        </a>
      </div>
    </div>
  );
};
