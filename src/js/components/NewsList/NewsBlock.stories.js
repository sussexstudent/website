import React from 'react';
import { storiesOf } from '@storybook/react';
import NewsGrid from './index';

storiesOf('NewsBlock', module)
  .add('with images', () =>
    <NewsGrid
      items={[
        {
          title: 'Union launch week of meta headlines for styleguide',
          link: 'https://example.com',
          publishedDate: new Date(),
          led: 'A small sentence or two about the news article',
          imageURL: 'https://www.sussexstudent.com/asset/News/6013/Lucy.jpg',
        },
      ]}
      fullWidth
    />
  )
  .add('without image', () =>
    <NewsGrid
      items={[
        {
          title: 'Union launch week of meta headlines for styleguide',
          link: 'https://example.com',
          publishedDate: new Date(),
          led: 'A small sentence or two about the news article',
        },
      ]}
      fullWidth
    />
  );
