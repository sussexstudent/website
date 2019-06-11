import React from 'react';
import { storiesOf } from '@storybook/react';
import { Storybase } from '../Storybase';
import NewsBlock from '../NewsList/NewsBlock';

storiesOf('NewsBlock', module)
  .addDecorator(Storybase())
  .add('standard', () => (
    <NewsBlock
      item={{
        id: 2,
        imageURL:
          'https://www.sussexstudent.com/asset/News/8775/Vote_Now_Stand_1_1_.png?thumbnail_width=1&thumbnail_height=1&resize_type=CropToFit',
        led:
          'This week, students have cast their votes to influence the work that the Students’ Union does through our spring referendum.',
        link:
          'https://www.sussexstudent.com/news/article/referenda/Spring-2018-referendum-results/',
        publishedDate: new Date('2018-05-03T23:00:00.000Z'),
        title: 'Spring 2018 referendum results',
      }}
    />
  ));
