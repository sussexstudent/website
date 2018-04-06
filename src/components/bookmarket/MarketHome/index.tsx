import React from 'react';
import qs from 'query-string';
import { compose, withState } from 'recompose';
import HeadingHero from '~components/HeadingHero';
import { Link } from 'react-router-dom';

import MARKET_HOME_QUERY from './MarketHomeQuery.graphql';
import { Form, Field } from 'react-final-form';
import {
  CurrentUserProps,
  CurrentUserQuery,
} from '~components/bookmarket/currentUserData';
import { HandledQuery } from '~components/HandledQuery';
import { adopt } from '~components/Adopt';

interface ComponentProps {
  query: string;
  setQuery(s: string): void;
}

interface MarketSection {
  title: string;
  slug: string;
}

interface Result {
  allMarketSections: MarketSection[];
}

type IProps = ComponentProps & CurrentUserProps;

class MarketHomeQuery extends HandledQuery<Result, {}> {}

interface RenderProps {
  user: CurrentUserProps;
  market: Result;
}

const Compose = adopt<RenderProps>({
  user: CurrentUserQuery,
  market: ({ render }) => (
    <MarketHomeQuery query={MARKET_HOME_QUERY}>{render}</MarketHomeQuery>
  ),
});

const MarketHomeComponent: React.SFC<IProps> = (props) => {
  return (
    <Compose>
      {(rProps) => {
        console.log(rProps);

        const data = rProps.market;

        const onSearchSubmit = (data: any) =>
          (props as any).history.push(
            `/book-market/search?${qs.stringify({ q: data.query })}`,
          );

        return (
          <div>
            <HeadingHero
              imageURL="original_images/ba5cfcc4a0304c55a6257f1d4da880a4"
              title="Book Market"
              description="Buy and sell second hand books at Sussex"
              thin
            />
            <div className="Layout Layout--sidebar-right Layout--sidebar-divider">
              <main>
                <Form
                  onSubmit={onSearchSubmit}
                  render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <Field
                        name="query"
                        className="HeaderSearch"
                        component="input"
                        type="search"
                        placeholder="Search by author or title"
                      />
                    </form>
                  )}
                />
                {data.allMarketSections ? (
                  <div>
                    <h3 className="type-pica" style={{ textAlign: 'center' }}>
                      Discover by school
                    </h3>
                    <ul className="BrickWall List--reset">
                      {data.allMarketSections.map((section) => (
                        <li className="BrickWall__item">
                          <Link
                            className="BrickWall__anchor"
                            to={`/book-market/section/${section.slug}`}
                          >
                            {section.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </main>
              <aside>
                <ul className="List--reset">
                  {props.isAuthenticated ? (
                    <li>
                      <Link
                        className="Button Button--color-green"
                        to="/book-market/list"
                      >
                        List a book
                      </Link>
                    </li>
                  ) : (
                    <em>Log in to list book</em>
                  )}
                  {props.isAuthenticated ? (
                    <li>
                      <Link className="Button" to="/book-market/my-listings">
                        Your listings
                      </Link>
                    </li>
                  ) : null}

                  <li>
                    <a href="/kb/features/book-market/information-sellers">
                      Information for sellers
                    </a>
                  </li>
                  <li>
                    <a href="/kb/features/book-market/information-buyers">
                      Information for buyers
                    </a>
                  </li>
                  <li>
                    <a href="/kb/features/book-market/usage-guidelines">
                      Usage Guidelines
                    </a>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        );
      }}
    </Compose>
  );
};

const MarketHome = compose<ComponentProps, IProps>(
  withState('query', 'setQuery', ''),
)(MarketHomeComponent as any); // todo

export { MarketHome };
