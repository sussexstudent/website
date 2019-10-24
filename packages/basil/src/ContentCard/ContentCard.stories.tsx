import { storiesOf } from '@storybook/react';
import { ContentCard } from './index';

storiesOf('ContentCard', module)
  .add('main', () => (
    <ContentCard>
      <h1>Hello there</h1>
      <h2>This is a content card with content inside.</h2>
    </ContentCard>
  ))
  .add('Error message', () => (
    <ContentCard className="ContentCard__error-message">
      <span>This is an error message in a content card</span>
    </ContentCard>
  ))
  .add('Anchor', () => (
    <ContentCard anchor="example">
      <h1>Anchor example</h1>
      <span>This would have the anchor name defined</span>
    </ContentCard>
  ));
