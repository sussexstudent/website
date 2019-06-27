import {Page} from "../../containers/content/types";
import {Event} from "@ussu/common/src/types/events";
import {StudentGroup} from "@ussu/common/src/types/groups";
import getFalmerEndpoint from "@ussu/common/src/libs/getFalmerEndpoint";
import {orderBy} from "lodash";

export interface SearchPayload {
  data: {
    search: {
      top: string[];
      content: Page[];
      events: Event[];
      groups: StudentGroup[];
      news: any[];
      pages: any[];
    };
  };
}

export enum GraphQLAreas {
  Content = 'content',
  Events = 'events',
  Groups = 'groups',
  News = 'news',
  Pages = 'pages',
  Top = 'top',
}

export function generateKeyMap(search: SearchPayload['data']['search']) {
  const m: { [key: string]: any } = {};

  Object.values(GraphQLAreas)
    .filter((a) => a !== GraphQLAreas.Top)
    .forEach((key: GraphQLAreas) => {
      (search[key] as any[]).forEach((item: any) => {
        m[`${item.__typename}_${item.id}`] = item;
      });
    });

  return m;
}


export function querySearch(query: string): Promise<SearchPayload> {
  return window
    .fetch(`${getFalmerEndpoint()}/graphql/`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            query Search($query: String) {
              search(query: $query) {
                content {
                  __typename
                  id
                  title
                  path
                  searchDescription
                }
                events {
                  __typename
                  eventId
                  title
                  slug
                  shortDescription
                }
                groups {
                  __typename
                  groupId
                  name
                  description
                  link
                }
                pages {
                  __typename
                  uuid
                  link
                  title
                  description
                }
                news {
                  __typename
                  uuid
                  link
                  title
                  description
                }
                top
              }
            }
          `,
        variables: {
          query,
        },
      }),
    })
    .then(res => res.json());
}

export function getPayloadMetadata({ data: { search } }: SearchPayload) {
  const payload = search;

  payload.events.map((event) => (event.id = event.eventId));
  payload.groups.map((group) => (group.id = group.groupId));
  payload.pages.map((page) => (page.id = page.uuid));
  payload.news.map((news) => (news.id = news.uuid));
  payload.groups.map((group) => (group.id = group.groupId));
  payload.content = payload.content.concat(payload.pages);

  const areaTitlesMap: { [key: string]: string } = {
    [GraphQLAreas.Top]: 'Top results',
    [GraphQLAreas.Groups]: 'Sports & Societies',
    [GraphQLAreas.News]: 'News',
    [GraphQLAreas.Events]: 'Events',
    [GraphQLAreas.Content]: 'Content',
    [GraphQLAreas.Pages]: 'Pages',
  };

  const calcWeight = (area: GraphQLAreas) => {
    if (area === GraphQLAreas.Top) {
      return Infinity;
    }

    if (area === GraphQLAreas.News) {
      return -1;
    }

    const count = payload[area].length;
    if (count <= 0) {
      return -Infinity;
    }

    return count;
  };

  const mk = (key: GraphQLAreas) => ({
    key,
    weight: calcWeight(key),
    count: payload[key].length,
    title: areaTitlesMap[key],
  });

  const orderedAreas = orderBy(
    [
      GraphQLAreas.Groups,
      GraphQLAreas.Events,
      GraphQLAreas.Content,
      GraphQLAreas.News,
      GraphQLAreas.Top,
    ].map(mk),
    [(i) => i.weight, (i) => i.title],
    ['desc', 'asc'],
  );

  const hasResults =
    Object.values(GraphQLAreas).reduce(
      (acc, key: GraphQLAreas) => payload[key].length + acc,
      0,
    ) > 0;

  const map = generateKeyMap(payload);

  return {
    payload,
    orderedAreas,
    hasResults,
    resultKeyMap: map,
    itemsByArea: {
      top: payload.top.map((key) => map[key]),
      events: payload.events,
      groups: payload.groups,
      content: payload.content,
      news: payload.news,
      pages: payload.pages,
    },
  };
}
