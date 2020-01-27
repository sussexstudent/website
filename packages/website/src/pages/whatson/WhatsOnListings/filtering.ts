import { getFirstItemOrValue } from '@ussu/common/src/libs/qs';
import { useLocation, useParams } from 'react-router';
import { mapValues, pickBy } from 'lodash';
import qs from 'query-string';

const allowedFilters = [
  'audienceJustForPgs',
  'audienceSuitableKidsFamilies',
  'audienceGoodToMeetPeople',
  'cost',
  'isOver18Only',
  'ticketLevel',
  'studentGroup',
  'type',
];

const filteringReplacements: { [k: string]: any } = {
  true: true,
  false: false,
  null: null,
};

export const useEventFilterCapture = () => {
  const location = useLocation();
  const { brandSlug, bundleSlug, groupSlug, venueSlug } = useParams();

  const filtering = location
    ? pickBy(getFirstItemOrValue(qs.parse(location.search)), (_v, k) =>
        allowedFilters.includes(k),
      )
    : {};

  const filters = mapValues(filtering, (v) =>
    filteringReplacements.hasOwnProperty(v) ? filteringReplacements[v] : v,
  );

  if (brandSlug) {
    filters.brand = brandSlug;
  }

  if (groupSlug) {
    filters.studentGroup = groupSlug;
  }

  if (bundleSlug) {
    filters.bundle = bundleSlug;
  }

  if (venueSlug) {
    filters.venue = venueSlug;
  }

  return filters;
};
