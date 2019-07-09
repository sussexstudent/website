import React from 'react';
import qs from 'query-string';
import HeadingHero from '../../../components/HeadingHero';
import MARKET_HOME_QUERY from './MarketHomeQuery.graphql';
import { Field, Form } from 'react-final-form';
import { CurrentUserProps, CurrentUserQuery } from '../currentUserData';
import { adopt } from '../../../components/Adopt';
import { InternalAppLink } from '../../../components/InternalAppLink';
import { HandledQuery } from '../HandledQuery';

interface ComponentProps {}

interface MarketSection {
  title: string;
  slug: string;
}

interface Result {
  allMarketSections: MarketSection[];
}

type IProps = ComponentProps;

class MarketHomeQuery extends HandledQuery<Result, {}> {}

interface RenderProps {
  user: CurrentUserProps;
  market: { data: Result };
}

const Compose = adopt<RenderProps>({
  user: CurrentUserQuery,
  market: ({ render }) => (
    <MarketHomeQuery query={MARKET_HOME_QUERY}>{render}</MarketHomeQuery>
  ),
});

const MarketHomeComponent: React.FC<IProps> = (props) => {
  return (
    <Compose>
      {(rProps) => {
        const { user, market } = rProps;
        const { data } = market;

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
                          <InternalAppLink
                            className="BrickWall__anchor"
                            to={`/book-market/section/${section.slug}`}
                          >
                            {section.title}
                          </InternalAppLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </main>
              <aside>
                <ul className="List--reset">
                  {user.isAuthenticated ? (
                    <li>
                      <InternalAppLink
                        className="Button Button--color-green"
                        to="/book-market/list"
                      >
                        List a book
                      </InternalAppLink>
                    </li>
                  ) : (
                    <em>Log in to list book</em>
                  )}
                  {user.isAuthenticated ? (
                    <li>
                      <InternalAppLink
                        className="Button"
                        to="/book-market/my-listings"
                      >
                        Your listings
                      </InternalAppLink>
                    </li>
                  ) : null}

                  <li>
                    <InternalAppLink to="/kb/features/book-market/information-sellers">
                      Information for sellers
                    </InternalAppLink>
                  </li>
                  <li>
                    <InternalAppLink to="/kb/features/book-market/information-buyers">
                      Information for buyers
                    </InternalAppLink>
                  </li>
                  <li>
                    <InternalAppLink to="/kb/features/book-market/usage-guidelines">
                      Usage Guidelines
                    </InternalAppLink>
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

const MarketHome = MarketHomeComponent;

export { MarketHome };
