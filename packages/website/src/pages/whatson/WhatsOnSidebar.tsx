import React from 'react';
import { InternalAppLink } from '../../components/InternalAppLink';
import HeartFull from '../../icons/heart-full.svg';
import { type, Typeface, TypeSize } from '@ussu/basil/src/style/type';
import { COLORS } from '@ussu/basil/src/style';
import qs from 'query-string';
import { useQuery } from '@apollo/react-hooks';
import {
  GetEventTypesQuery,
  GetGroupsWithEventsQuery,
  GetLiveBrandingPeriodsQuery,
} from '../../generated/graphql';
import EVENT_TYPES_QUERY from './EventTypes.graphql';
import GROUPS_WITH_EVENTS_QUERY from './GroupsWithEvents.graphql';
import LIVE_BRANDING_PERIOD_QUERY from './LiveBrandingPeriods.graphql';
import { whatsOnListingViews } from './WhatsOnListings/views';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

const SidebarSection: React.FC<{ title: string }> = ({ title, children }) => (
  <div css={{ marginBottom: '1rem' }}>
    <div
      css={[
        type(TypeSize.LongPrimer, Typeface.Secondary),
        {
          textTransform: 'uppercase',
          fontWeight: 700,
          color: COLORS.GREY_WORST_WINTER,
        },
      ]}
    >
      {title}
    </div>
    <div>{children}</div>
  </div>
);

const SidebarSectionList: React.FC = ({ children }) => (
  <ul css={{ margin: 0, padding: 0, listStyle: 'none' }}>{children}</ul>
);
const SectionNavItem: React.FC<{ to: string; exact?: boolean }> = ({
  to,
  children,
  ...props
}) => (
  <li>
    <InternalAppLink
      nav
      {...props}
      activeStyle={{ background: COLORS.BRAND_BLUE, color: '#fff' }}
      to={to}
      css={{
        display: 'block',
        fontWeight: 500,
        textDecoration: 'none',
        marginBottom: '0.5rem',
        padding: '0.2rem 0.4rem',
        borderRadius: 2,
        '&:hover': {
          background: 'rgba(30, 30, 60, 0.05)',
          color: COLORS.GREY_SAD_SLATE,
        },
      }}
    >
      {children}
    </InternalAppLink>
  </li>
);

const passQuery = (
  obj: qs.ParsedQuery<string>,
  prop: string,
  value: string,
) => {
  if (Object.hasOwnProperty.bind(obj, prop) && obj[prop] === value) {
    delete obj[prop];
  } else {
    obj[prop] = value;
  }

  return obj;
};

const SectionNavFilter: React.FC<{
  prop: string;
  value: string;
  exact?: boolean;
}> = ({ prop, value, children, ...props }) => {
  const location = useLocation();
  const history = useHistory();
  const query = qs.parse(location.search);

  const hasParam =
    Object.hasOwnProperty.bind(query, prop) && query[prop]?.includes(value);

  return (
    <li>
      <button
        type="button"
        {...props}
        onClick={() =>
          history.replace(
            `${location.pathname}?${qs.stringify(
              passQuery(query, prop, value),
            )}`,
          )
        }
        css={[
          {
            width: '100%',
            background: 'transparent',
            fontSize: 'inherit',
            fontFamily: 'inherit',
            textAlign: 'inherit',
            border: 'initial',
            display: 'block',
            fontWeight: 500,
            textDecoration: 'none',
            marginBottom: '0.5rem',
            padding: '0.4rem 0.4rem',
            borderRadius: 2,
            transition:
              '300ms box-shadow ease, 300ms background ease, 300ms border-left ease',
            boxShadow: '0 2px 6px rgba(30, 30, 30, 0)',
            borderLeft: `0 transparent solid`,
            '&:hover': {
              background: '#fff',
              boxShadow: '0 2px 6px rgba(30, 30, 30, 0.05)',
            },
          },

          hasParam && {
            background: '#fff',
            boxShadow: '0 2px 6px rgba(30, 30, 30, 0.05)',
            borderLeft: `3px ${COLORS.BRAND_RED} solid`,
          },
        ]}
      >
        {children}
      </button>
    </li>
  );
};

export const WhatsOnSidebar: React.FC = ({}) => {
  return (
    <React.Fragment>
      <h2 css={{ marginTop: 0 }}>
        <InternalAppLink to="/whats-on" css={{ textDecoration: 'none' }}>
          {"What's on"}
        </InternalAppLink>
      </h2>
      <SidebarSection title="Explore">
        <SidebarSectionList>
          {/*<SectionFilter to="/whats-on/featured">Featured</SectionFilter>*/}
          <SectionNavItem to="/whats-on/" exact>
            All events
          </SectionNavItem>

          <SectionNavItem to="/whats-on/saved">
            <div
              css={{
                width: 16,
                height: 16,
                color: '#ff005d',
                display: 'inline-block',
              }}
            >
              <HeartFull />
            </div>{' '}
            Saved
          </SectionNavItem>
        </SidebarSectionList>
      </SidebarSection>

      <div>
        <Switch>
          {whatsOnListingViews.map((view) => (
            <Route
              path={view.path}
              component={view.sidebarAppends}
              exact={view.exact}
            />
          ))}
        </Switch>
      </div>

      <div css={type(TypeSize.Minion)}>
        <InternalAppLink to="/get-involved/societies-and-student-media/guides/events/how-hold-event/organising-events/">
          Interested in holding your own event?
        </InternalAppLink>
      </div>
    </React.Fragment>
  );
};

export const WhatsOnSidebarGroupsActiveNav = () => {
  const { data: groupsData, loading: groupsLoading } = useQuery<
    GetGroupsWithEventsQuery
  >(GROUPS_WITH_EVENTS_QUERY);

  return groupsLoading ||
    !groupsData?.allGroupsWithEvents ||
    groupsData?.allGroupsWithEvents.length <= 0 ? null : (
    <SidebarSection title="Groups">
      <SidebarSectionList>
        {groupsData?.allGroupsWithEvents &&
        groupsData.allGroupsWithEvents.length > 0
          ? groupsData.allGroupsWithEvents.map((group) => (
              <SectionNavItem
                to={`/whats-on/groups/${group.slug}`}
                key={group.slug || 'x'}
              >
                {group.name}
              </SectionNavItem>
            ))
          : null}
      </SidebarSectionList>
    </SidebarSection>
  );
};

export const WhatsOnSidebarFilterType = () => {
  const { data: typesData, loading: typesLoading } = useQuery<
    GetEventTypesQuery
  >(EVENT_TYPES_QUERY);

  return typesLoading ||
    !typesData?.allEventTypes ||
    typesData?.allEventTypes.length <= 0 ? null : (
    <SidebarSection title="Types">
      <SidebarSectionList>
        {typesData?.allEventTypes && typesData.allEventTypes.length > 0
          ? typesData.allEventTypes.map((type) => (
              <SectionNavItem
                to={`/whats-on?type=${type.slug}`}
                key={type.slug}
              >
                {type.name}
              </SectionNavItem>
            ))
          : null}
      </SidebarSectionList>
    </SidebarSection>
  );
};

export const WhatsOnSidebarFilters: React.FC = () => {
  const { data, loading } = useQuery<GetLiveBrandingPeriodsQuery>(
    LIVE_BRANDING_PERIOD_QUERY,
  );

  return (
    <React.Fragment>
      {loading ||
      !data?.allBrandingPeriods ||
      data?.allBrandingPeriods.length <= 0 ? null : (
        <SidebarSection title="Collections">
          <SidebarSectionList>
            {data?.allBrandingPeriods && data.allBrandingPeriods.length > 0
              ? data.allBrandingPeriods.map((period) => (
                  <SectionNavItem
                    to={`/whats-on/collections/${period.slug}`}
                    key={period.slug}
                  >
                    {period.name}
                  </SectionNavItem>
                ))
              : null}
          </SidebarSectionList>
        </SidebarSection>
      )}

      <h3>Filters</h3>

      <SidebarSection title="Good for">
        <SidebarSectionList>
          <SectionNavFilter prop="isOver18Only" value="false">
            Under 18's
          </SectionNavFilter>
          <SectionNavFilter prop="audienceGoodToMeetPeople" value="true">
            Meeting people
          </SectionNavFilter>
          <SectionNavFilter prop="audienceJustForPgs" value="true">
            Postgrads
          </SectionNavFilter>
          <SectionNavFilter prop="audienceSuitableKidsFamilies" value="true">
            Kids & Families
          </SectionNavFilter>
        </SidebarSectionList>
      </SidebarSection>

      <SidebarSection title="Cost">
        <SidebarSectionList>
          <SectionNavFilter prop="cost" value="FREE">
            Free
          </SectionNavFilter>
          <SectionNavFilter prop="cost" value="PAID">
            Ticketed
          </SectionNavFilter>
        </SidebarSectionList>
      </SidebarSection>

      {/*<SidebarSection title="Groups">*/}
      {/*  <button onClick={openGroupModal}>Filter by Group</button>*/}
      {/*</SidebarSection>*/}
    </React.Fragment>
  );
};
