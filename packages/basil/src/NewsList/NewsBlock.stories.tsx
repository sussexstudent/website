import React from 'react';
import { NewsBlock } from '../../../website/src/components/NewsList/NewsBlock';

export default { title: 'NewsBlock' };

export const Standard = () => (
  <NewsBlock
    item={{
      id: 2,
      imageURL:
        'https://ussu.imgix.net/asset/News/6013/Library-Square-Welcome-Hub-Freshers-2017-1.jpg?w=320&h=180&auto=format&q=80&fit=crop&crop=faces',
      led:
        'This week, students have cast their votes to influence the work that the Students’ Union does through our spring referendum.',
      link:
        'https://www.sussexstudent.com/news/article/referenda/Spring-2018-referendum-results/',
      publishedDate: new Date('2018-05-03T23:00:00.000Z'),
      title: 'Spring 2018 referendum results',
    }}
  />
);
