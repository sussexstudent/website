import React from 'react';
import Playground, { PlaygroundState } from '../../components/Playground';

const standardMarkup = color => `
<div class="Deckchair Deckchair--color-${color}" data-chair="feedback0117">
  <div class="Deckchair__close"></div>
  <div class="Deckchair__info">
    <h3 class="Deckchair__header">We love hearing your feedback</h3>
    <p class="Deckchair__about">Text here about what we do with feed back and stuff</p>
  </div>
  <div class="Deckchair__cta">
    <a href="/newsletter" class="Deckchair__button" data-action="subscribe">Subscribe to our newsletter</a>
  </div>
</div>
`;

function DeckchairComponentPage() {
  return (
    <div>
      <h1>Deckchair 🍹</h1>
      <p>A full width banner, with an call to action button.</p>

      <Playground>
        <PlaygroundState name="Blue" markup={standardMarkup('blue')} />
        <PlaygroundState name="Red" markup={standardMarkup('red')} />
        <PlaygroundState name="Green" markup={standardMarkup('green')} />
      </Playground>
    </div>
  );
}

DeckchairComponentPage.title = 'Deckchair';
DeckchairComponentPage.slug = 'Deckchair';

export default DeckchairComponentPage;
