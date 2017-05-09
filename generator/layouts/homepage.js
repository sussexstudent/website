import React from 'react';
import FigureCollection from '../components/FigureCollection';
import FigureCollectionFigure from '../components/FigureCollectionFigure';
import HomepageEventsList from '../components/HomepageEventsList';
import VoteGE from '../components/banners/VoteGE';

const Homepage = () => (
  <div>
    <div className="Trail">
      <div className="Trail__row  u-container-bleed-2">
        <VoteGE />
      </div>
      <div className="Trail__row Trail__row--211">
        <div className="ContentBlock">
          <div className="ContentBlock__heading">News</div>
          <div className="u-h">
            {'{unionnewslist}'}
          </div>
          <div className="app__news" />
          <a className="NewsViewMore" href="/news">Read more news stories</a>
        </div>
        <div className="ContentBlock">
          <div className="ContentBlock__heading">{'What\'s on'}</div>
          <HomepageEventsList />
        </div>
        <div className="ContentBlock">
          <div className="ContentBlock__heading">Twitter</div>
          <div className="js-module--tweetList u-container-bleed-1 u-extend-flex" data-query="list/ussu,ussu" data-signature="f1b9176fddbe7114295eb4bfc65070c5a130a94d" />
        </div>
      </div>

      <div className="ContentBlock">
        <div className="ContentBlock__heading">Your officers</div>
        <FigureCollection>
          <FigureCollectionFigure
            imageURL="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Adele(1).jpg"
            title="Adèle Duvillier"
            sub="Activities Officer"
            link="/about-us/full-time-elected-officers/activities"
          />
          <FigureCollectionFigure
            imageURL="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Sarah-bw.jpg"
            title="Sarah Gibbons"
            sub="Society and Citizenship Officer"
            link="/about-us/full-time-elected-officers/society-citizenship"
          />
          <FigureCollectionFigure
            imageURL="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Savannah(1).jpg"
            title="Savannah Sevenzo"
            sub="Undergraduate Education Officer"
            link="/about-us/full-time-elected-officers/undergraduate-education"
          />
          <FigureCollectionFigure
            imageURL="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Rose-bw.jpg"
            title="Rose Taylor"
            sub="Postgraduate Education Officer"
            link="/about-us/full-time-elected-officers/postgraduate-education"
          />
          <FigureCollectionFigure
            imageURL="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Annie-bw.jpg"
            title="Annie Pickering"
            sub="President"
            link="/about-us/full-time-elected-officers/president"
          />
          <FigureCollectionFigure
            imageURL="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/on-white.jpg"
            title="Grainne Gahan"
            sub="Welfare Officer"
            link="/about-us/full-time-elected-officers/welfare"
          />
        </FigureCollection>
      </div>
    </div>
  </div>
);

export default Homepage;
