import React from 'react';
import parse from 'url-parse';
import formatDistance from 'date-fns/formatDistance';
import isSameDay from 'date-fns/isSameDay';
import Logotype from '../../img/logotype';
import {AspectRatio, OneImage} from "~components/OneImage";

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
          {imageURL ? (
            <OneImage
              src={parse(imageURL).pathname.slice(1)}
              aspectRatio={AspectRatio.r16by9}
              alt={""}
              mslResource
            />
          ) : (
            <div className="u-responsive-ratio u-responsive-ratio--r16by9">
              <div className="NewsBlock__image--default">
                <Logotype />
              </div>
            </div>
          )}
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
