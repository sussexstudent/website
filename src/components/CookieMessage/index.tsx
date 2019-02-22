import React, { useState } from 'react';
import { COLORS, Layers } from '~libs/style';
import styled from '@emotion/styled';
import { type, Typeface, TypeSize } from '~libs/style/type';
import { cardRaised } from '~libs/style/cards';

const MessageContainer = styled.div({
  position: 'fixed',
  bottom: '10px',
  zIndex: Layers.GlobalNotice,
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  '& a': {
    color: COLORS.BLACK,
    textDecoration: 'underline',
  },
});

const MessageBlimp = styled.div(
  {
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
  },
  cardRaised,
);

const MessageAction = styled.div({
  paddingTop: '1rem',
});

const CookieMessage = () => {
  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return null;
  }

  return (
    <MessageContainer>
      <MessageBlimp>
        {
          'This site uses cookies. By continuing to browse, you agree to our use of cookies on the site. '
        }
        <a href="/cookie-policy">Learn more</a>.
        <MessageAction>
          <button
            className="Button"
            title="Close"
            onClick={() => setHidden(true)}
            type="button"
          >
            Close
          </button>
        </MessageAction>
      </MessageBlimp>
    </MessageContainer>
  );
};

export default CookieMessage;
