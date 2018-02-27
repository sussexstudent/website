import React from 'react';
import qs from 'query-string';
import { compose, withState } from 'recompose';
import { graphql, ChildProps } from 'react-apollo';
import HeadingHero from '~components/HeadingHero';
import { Link } from 'react-router-dom';

import MarketHomeQuery from './MarketHomeQuery.graphql';
import { Form, Field } from 'react-final-form';

interface OwnProps {}

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

type IProps = ChildProps<OwnProps, Result> & ComponentProps;

const MarketHomeComponent: React.SFC<IProps> = (props) => {
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
      <div className="Layout--sidebar-right">
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
          {props.data && props.data.allMarketSections ? (
            <div>
              <h3 className="type-pica">Discover by school</h3>
              <ul className="BrickWall List--reset">
                {props.data.allMarketSections.map((section) => (
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
            <li>
              <Link className="Button" to="/book-market/list">
                List a book
              </Link>
            </li>
            <li>
              <Link className="Button" to="/book-market/my-listings">
                Your listings
              </Link>
            </li>

            <li>
              <a href="#">Information for sellers</a>
            </li>
            <li>
              <a href="#">Information for buyers</a>
            </li>
            <li>
              <a href="#">Usage Guidelines</a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

const MarketHome = compose<ComponentProps, IProps>(
  graphql(MarketHomeQuery),
  withState('query', 'setQuery', ''),
)(MarketHomeComponent);

export { MarketHome };
