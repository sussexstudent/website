import React from 'react';
import { WhatsOnBrandedComponentLocation } from './locations';
import { type, Typeface, TypeSize } from '@ussu/common/src/libs/style/type';
import { Link } from 'react-router-dom';

const SimpleFilterList: React.FC = ({ children }) => (
  <ul
    css={{
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      ...type(TypeSize.GreatPrimer, Typeface.Secondary),
      fontWeight: 'bold',
      flexWrap: 'wrap',
      '& li': {
        display: 'block',
        padding: '0.6rem',
      },
      '& a': {
        textDecoration: 'none',
      },
    }}
  >
    {children}
  </ul>
);

export const whatsOnBrandingMap: {
  [slug: string]: { [location: number]: React.FC };
} = {
  'freshers-week-2019': {
    [WhatsOnBrandedComponentLocation.Container]: ({ children }) => (
      <div
        css={{
          backgroundImage: `url(${require('../../../img/freshers-2019/repeatable-bg-left.svg')}), url(${require('../../../img/freshers-2019/repeatable-bg-right.svg')})`,
          backgroundRepeat: 'repeat-y, repeat-y',
          backgroundPosition: 'top left, top right',
        }}
      >
        {children}
      </div>
    ),
    [WhatsOnBrandedComponentLocation.PeriodHeader]: ({
      brandingPeriod,
    }: any) => (
      <div>
        <h1 css={{ textTransform: 'uppercase', textAlign: 'center' }}>
          {brandingPeriod.name}
        </h1>

        <div>
          Filter to:
          <SimpleFilterList>
            <li>
              <Link to={`?`}>Everything</Link>
            </li>
            <li>
              <Link to={`?audienceGoodToMeetPeople=true`}>
                Good for meeting people
              </Link>
            </li>
            <li>
              <Link to={`?audienceSuitableKidsFamilies=true`}>
                Suitable for kids & families
              </Link>
            </li>
            <li>
              <Link to={`?audienceJustForPgs=true`}>Great for Postgrads</Link>
            </li>
            <li>
              <Link to={`?cost=FREE`}>Free</Link>
            </li>
            <li>
              <Link to={`?cost=PAID`}>Ticketed</Link>
            </li>
          </SimpleFilterList>
        </div>
      </div>
    ),
  },
};
