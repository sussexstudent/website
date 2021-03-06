import React from 'react';
import qs from 'query-string';
import { HeadingHero } from '../../../components/HeadingHero';
import GET_ALL_MARKET_SECTIONS_QUERY from '../getAllMarketSections.graphql';
import { Field, Form } from 'react-final-form';
import { useViewer } from '../currentUserData';
import { InternalAppLink } from '../../../components/InternalAppLink';
import { useQuery } from '@apollo/react-hooks';
import { Loader } from '../../../components/Loader';
import { ErrorState } from '../../../components/ErrorState';
import { GetAllMarketSectionsQuery } from '../../../generated/graphql';

export const MarketHome: React.FC = (props) => {
  const { loading: viewerLoading, isAuthenticated } = useViewer();
  const { data, loading } = useQuery<GetAllMarketSectionsQuery>(
    GET_ALL_MARKET_SECTIONS_QUERY,
  );

  if (viewerLoading || loading) {
    return <Loader />;
  }

  if (!data) {
    return <ErrorState />;
  }

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
                  <li className="BrickWall__item" key={section.slug}>
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
            {isAuthenticated ? (
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
            {isAuthenticated ? (
              <li>
                <InternalAppLink
                  className="Button"
                  to="/book-market/my-listings"
                >
                  Your listings
                </InternalAppLink>
              </li>
            ) : null}

            {/*<li>*/}
            {/*  <InternalAppLink to="/kb/features/book-market/information-sellers">*/}
            {/*    Information for sellers*/}
            {/*  </InternalAppLink>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <InternalAppLink to="/kb/features/book-market/information-buyers">*/}
            {/*    Information for buyers*/}
            {/*  </InternalAppLink>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <InternalAppLink to="/kb/features/book-market/usage-guidelines">*/}
            {/*    Usage Guidelines*/}
            {/*  </InternalAppLink>*/}
            {/*</li>*/}
          </ul>
        </aside>
      </div>
    </div>
  );
};
