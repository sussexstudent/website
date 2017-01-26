import React from 'react';
import FigureCollection from '../components/FigureCollection';
import FigureCollectionFigure from '../components/FigureCollectionFigure';
import HomepageEventsList from '../components/HomepageEventsList';

const Homepage = () => (
  <div className="Container">
    <div className="Trail">
      <div className="Trail__row">
        <a className="FlexibleHero FlexibleHero--link" style={{ backgroundColor: '#840056' }} href="/nssboycott">
          <img className="FlexibleHero__image FlexibleHero__image--center" src="https://www.sussexstudent.com/pageassets/web-banner-img.svg" alt="Boycott the NSS" />
        </a>
      </div>
      <div className="Trail__row Trail__row--211">
        <div className="ContentBlock">
          <div className="ContentBlock__heading">News</div>
          <ul className="NewsGrid">
            {'{news}'}
          </ul>
        </div>
        <div className="ContentBlock">
          <div className="ContentBlock__heading">{'What\'s on'}</div>
          <HomepageEventsList />
        </div>
        <div className="ContentBlock">
          <div className="ContentBlock__heading">Twitter</div>
          <div className="app__tweets" />
        </div>
      </div>

      <div className="ContentBlock">
        <div className="ContentBlock__heading">Your officers</div>
        <FigureCollection>
          <FigureCollectionFigure image="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Savannah(1).jpg" title="Example name" sub="example role" />
          <FigureCollectionFigure image="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Savannah(1).jpg" title="Example name" sub="example role" />
          <FigureCollectionFigure image="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Savannah(1).jpg" title="Example name" sub="example role" />
          <FigureCollectionFigure image="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Savannah(1).jpg" title="Example name" sub="example role" />
          <FigureCollectionFigure image="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Savannah(1).jpg" title="Example name" sub="example role" />
          <FigureCollectionFigure image="https://www.sussexstudent.com/pageassets/about-us/full-time-elected-officers/Savannah(1).jpg" title="Example name" sub="example role" />
        </FigureCollection>
      </div>
    </div>
  </div>
);

export default Homepage;
