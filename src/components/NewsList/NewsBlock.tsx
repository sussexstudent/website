import React from 'react';
import parse from 'url-parse';
import formatDistance from 'date-fns/formatDistance';
import isSameDay from 'date-fns/isSameDay';
import Logotype from '../../img/logotype';
import Image from '../Image';

export interface NewsItem {
  id: number;
  title: string;
  link: string;
  publishedDate: Date;
  led: string;
  imageURL?: string;
}

interface IProps {
  item: NewsItem;
}

const NewsBlock = ({
  item: { title, link, publishedDate, led, imageURL = null },
}: IProps) => (
  <li className="NewsGrid__item NewsBlock">
    <a className="NewsBlock__link" href={link}>
      <div className="NewsBlock__image">
        <div className="u-responsive-ratio u-responsive-ratio--43">
          {imageURL ? (
            <Image
              className="ResponsiveImage"
              src={parse(imageURL).pathname}
              mslResource
              lazy
            />
          ) : (
            <div className="NewsBlock__image--default">
              <Logotype />
            </div>
          )}
        </div>
      </div>

      <div className="NewsBlock__content">
        <div className="NewsBlock__title-link">
          <h2 className="NewsBlock__title">{title}</h2>
        </div>
        <p className="NewsBlock__standfirst">{led}</p>
        <div className="NewsBlock__meta">
          <time className="NewsBlock__date">
            {isSameDay(publishedDate, new Date())
              ? 'Today'
              : `${formatDistance(publishedDate, new Date())} ago`}
          </time>
        </div>
      </div>
    </a>
  </li>
);

export default NewsBlock;
