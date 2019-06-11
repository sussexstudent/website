import React, { useState } from 'react';
import { COLORS, Layers } from '@ussu/common/src/libs/style';
import { type, Typeface, TypeSize } from '@ussu/common/src/libs/style/type';

const CookieMessage: React.FC = () => {
  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return null;
  }

  return (
    <div css={{
      position: 'fixed',
      bottom: '10px',
      zIndex: Layers.GlobalNotice,
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      '& a': {
        color: COLORS.BLACK,
        textDecoration: 'underline',
      },
    }}>
      <div css={{
        ...type(TypeSize.LongPrimer, Typeface.Secondary),
        textAlign: 'center',
        padding: '0.6rem',
        backgroundColor: COLORS.WHITE,
        maxWidth: '300px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        borderRadius: '2px',
        fontWeight: 600,
      }}>
        {
          'This site uses cookies. By continuing to browse, you agree to our use of cookies on the site. '
        }
        <a href="/cookie-policy">Learn more</a>.
        <div css={{
          paddingTop: '1rem',
        }}>
          <button
            className="Button"
            title="Close"
            onClick={() => setHidden(true)}
            type="button"
            data-testid="close"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieMessage;
