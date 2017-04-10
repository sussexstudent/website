import React from 'react';
import FigureCollection from '../components/FigureCollection';
import FigureCollectionFigure from '../components/FigureCollectionFigure';
import HomepageEventsList from '../components/HomepageEventsList';
import HeadingImage from '../components/HeadingImage';

// cafe
//

// elected
// /pageassets/get-involved/Group-1.jpg

const createItem = (title, link, imageURL) => ({ title, link, imageURL });
const items = [
  createItem(
    'Sport, societies & media',
    '/sport-societies-media',
    '/pageassets/get-involved/ssm.jpg',
  ),
  createItem(
    'Join the Role Models Project',
    '/volunteer/role-models',
    '/pageassets/get-involved/role-models.jpg',
  ),
  createItem(
    'Volunteer at reception',
    '/volunteer/reception',
    '/pageassets/get-involved/Rhiannon.jpg',
  ),
  createItem(
    'Become a Students\' Union Ambassador',
    '/volunteer/welcome-team',
    '/pageassets/get-involved/suab.jpg',
  ),
  createItem(
    'Join a campaign team',
    '/volunteer/campaign-volunteer',
    '/pageassets/get-involved/campaign-team.jpg',
  ),
  createItem(
    'Volunteer at the Language Café',
    '/volunteer/language-cafe',
    '/pageassets/get-involved/d5mqnyolclw-alisa-anton.jpg',
  ),
  createItem(
    'Join the Buddy Scheme',
    'http://www.buddyscheme.com/apply',
    '/pageassets/get-involved/buddy-scheme.jpg',
  ),
  createItem(
    'Hold an elected position',
    '/elections',
    '/pageassets/get-involved/elected-position.jpg',
  ),
  createItem(
    'Campaign for change',
    '/campaigns',
    '/pageassets/get-involved/campaign-change.jpg',
  ),
  createItem(
    'Vote',
    '/democracy',
    '/pageassets/get-involved/vote.jpg',
  ),
  createItem(
    'Work for us',
    '/jobs',
    '/pageassets/get-involved/work.jpg',
  ),
];

const img = '/pageassets/get-involved/get-involved.jpg';
const GetInvolved = () => (
  <div>
    <HeadingImage imageURL={img} title="Get involved" />
    <ul className="SelectionGrid">
      {items.map(item => (
        <li className="SelectionGrid__item SelectionGrid--underneath" key={item.link}>
          <a className="SelectionGrid__link" href={item.link}>
            <div className="SelectionGrid__image" style={{ backgroundImage: `url(${item.imageURL}?thumbnail=true&height=230&width=640&resize_type=CropToFit)` }}>
              <div className="SelectionGrid__image-inside">
                <div className="SelectionGrid__title">{item.title}</div>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default GetInvolved;
