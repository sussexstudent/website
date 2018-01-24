import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import AllMediaQuery from './AllMedia.graphql';
import Loader from '../../../Loader';
import FauxRouterLink from '../../../FauxRouterLink';
import { compose } from 'recompose';
import { Connection } from '~components/falmer/types';
import { FalmerImage } from '../../../../types/events';
import { ApolloHandlerChildProps } from '~components/apolloHandler';
import { OneImage } from '~components/OneImage';

interface OwnProps {}

interface Result {
  allImages: Connection<FalmerImage>;
  loadMoreEntries(): void;
}

type IProps = ApolloHandlerChildProps<OwnProps, Result>;

function FalmerMediaList({
  data: { loading, loadMoreEntries, allImages },
}: IProps) {
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <ul className="FalmerMediaGrid">
            {allImages.edges.map((edge) => (
              <li className="FalmerMediaGrid__item">
                <div
                  className="u-responsive-fit"
                  style={{
                    height: '110px',
                    width: `${Math.round(
                      110 * (edge.node.width / edge.node.height),
                    )}px`,
                  }}
                >
                  <FauxRouterLink href={`/media/${edge.node.mediaId}`} />
                  <OneImage
                    src={edge.node.resource}
                    aspectRatio={{
                      width: edge.node.width,
                      height: edge.node.height,
                    }}
                    alt=""
                  />
                </div>
              </li>
            ))}
          </ul>
          {allImages.pageInfo.hasNextPage ? (
            <button className="Button" onClick={loadMoreEntries}>
              Load more
            </button>
          ) : (
            <em>{`That's your lot!`}</em>
          )}
        </div>
      )}
    </div>
  );
}

export default compose<IProps, OwnProps>(
  graphql<Result, OwnProps>(AllMediaQuery, {
    props({ data }) {
      if (!data) {
        return {
          data,
        };
      }

      const fetchMore = data.fetchMore;
      return {
        data: {
          loading: data.loading,
          allImages: data.allImages,
          loadMoreEntries() {
            return fetchMore({
              query: AllMediaQuery,
              variables: {
                cursor: data.allImages.pageInfo.endCursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return {};
                }
                const newEdges = fetchMoreResult.allImages.edges;
                const pageInfo = fetchMoreResult.allImages.pageInfo;
                return {
                  // Put the new comments at the end of the list and update `pageInfo`
                  // so we have the new `endCursor` and `hasNextPage` values
                  allImages: {
                    pageInfo,
                    edges: [...previousResult.allImages.edges, ...newEdges],
                  },
                };
              },
            });
          },
        },
      };
    },
  }),
  withRouter,
)(FalmerMediaList);
