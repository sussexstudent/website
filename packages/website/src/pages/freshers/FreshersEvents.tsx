import React from 'react';
import { FreshersContainer } from './FreshersContainer';
import { EventsList } from '../../pages/events/EventsCalender';
import { addMonths, startOfDay } from 'date-fns';
import qs from 'query-string';
import { mapValues, pickBy } from 'lodash';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';
import { type, Typeface, TypeSize } from '@ussu/basil/src/style/type';
import { getFirstItemOrValue } from '@ussu/common/src/libs/qs';

interface FreshersEventsProps extends RouteComponentProps<{ path: string }> {}

const filteringAcceptions = [
  'audienceJustForPgs',
  'audienceSuitableKidsFamilies',
  'audienceGoodToMeetPeople',
  'cost',
  'isOver18Only',
  'ticketLevel',
];

const filteringReplacements: { [k: string]: any } = {
  true: true,
  false: false,
  null: null,
};

const SimpleFilterList = styled.ul({
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
    textTransform: 'uppercase',
  },
  '& a': {
    textDecoration: 'none',
  },
});

export const FreshersEvents: React.FC<FreshersEventsProps> = ({ location }) => {
  const filtering = location
    ? pickBy(
        getFirstItemOrValue(qs.parse(location.search)),
        (_v, k) => filteringAcceptions.indexOf(k) >= 0,
      )
    : {};

  const hash = (location && location.hash) || '';

  return (
    <FreshersContainer>
      <div className="LokiContainer">
        <h1>What's on</h1>
        <div>
          Filter to:
          <SimpleFilterList>
            <li>
              <Link to={`?${hash}`}>Everything</Link>
            </li>
            <li>
              <Link to={`?audienceGoodToMeetPeople=true${hash}`}>
                Good for meeting people
              </Link>
            </li>
            <li>
              <Link to={`?audienceSuitableKidsFamilies=true${hash}`}>
                Suitable for kids & families
              </Link>
            </li>
            <li>
              <Link to={`?audienceJustForPgs=true${hash}`}>
                Great for Postgrads
              </Link>
            </li>
            <li>
              <Link to={`?cost=FREE${hash}`}>Free</Link>
            </li>
            <li>
              <Link to={`?cost=PAID${hash}`}>Ticketed</Link>
            </li>
          </SimpleFilterList>
        </div>
        <EventsList
          filter={{
            brand: 'freshers-week-2018',
            fromTime: startOfDay(new Date()).toISOString(),
            toTime: addMonths(startOfDay(new Date()), 6).toISOString(),
            ...mapValues(filtering, (v) =>
              filteringReplacements.hasOwnProperty(v)
                ? filteringReplacements[v]
                : v,
            ),
          }}
          disableHeader
        />
      </div>
    </FreshersContainer>
  );
};
