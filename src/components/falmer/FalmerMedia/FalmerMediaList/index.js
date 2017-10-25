import React from 'react';
import { graphql } from 'react-apollo';
import AllMediaQuery from './AllMedia.graphql';
import Loader from '../../../Loader';
import Image from '../../../Image';
import FauxRouterLink from '../../../FauxRouterLink';

function FalmerMediaList({ data: { loading, loadMoreEntries, allImages } }) {
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <ul className="FalmerMediaGrid">
            {allImages.edges.map(edge => (
              <li className="FalmerMediaGrid__item">
                <div
                  className="u-responsive-fit"
                  alt=""
                  style={{
                    height: '110px',
                    width: `${Math.round(
                      110 * (edge.node.width / edge.node.height)
                    )}px`,
                  }}
                >
                  <FauxRouterLink href={`/media/${edge.node.mediaId}`} />
                  <Image src={edge.node.resource} lazy />
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

export default graphql(AllMediaQuery, {
  props({ data: { loading, allImages, fetchMore } }) {
    return {
      data: {
        loading,
        allImages,
        loadMoreEntries() {
          return fetchMore({
            query: AllMediaQuery,
            variables: {
              cursor: allImages.pageInfo.endCursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.allImages.edges;
              const pageInfo = fetchMoreResult.allImages.pageInfo;
              return {
                // Put the new comments at the end of the list and update `pageInfo`
                // so we have the new `endCursor` and `hasNextPage` values
                allImages: {
                  edges: [...previousResult.allImages.edges, ...newEdges],
                  pageInfo,
                },
              };
            },
          });
        },
      },
    };
  },
})(FalmerMediaList);
