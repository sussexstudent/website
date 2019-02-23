import React from 'react';
import ALL_MEDIA_QUERY from './AllMedia.graphql';
import { FauxRouterLinkNonIAL } from '~components/FauxRouterLink';
import { Connection } from '~types/falmer';
import { FalmerImage } from '~types/events';
import { OneImage } from '~components/OneImage';
import { useQuery } from 'react-apollo-hooks';
import Loader from '~components/Loader';
import { ErrorState } from '~components/ErrorState';

interface Result {
  allImages?: Connection<FalmerImage>;
}

const FalmerMediaList: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery<Result>(
    ALL_MEDIA_QUERY,
    {},
  );

  if (loading) {
    return <Loader />;
  }

  if (error || !data || !data.allImages) {
    return <ErrorState />;
  }

  const { allImages } = data;
  return (
    <div>
      <ul className="FalmerMediaGrid">
        {allImages.edges.map((edge) => (
          <li className="FalmerMediaGrid__item" key={edge.node.mediaId}>
            <div
              className="u-responsive-fit"
              style={{
                height: '110px',
                width: `${Math.round(
                  110 * (edge.node.width / edge.node.height),
                )}px`,
              }}
            >
              <FauxRouterLinkNonIAL href={`/media/${edge.node.mediaId}`} />
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
        <button
          className="Button"
          onClick={() =>
            fetchMore({
              query: ALL_MEDIA_QUERY,
              variables: {
                cursor: data.allImages && data.allImages.pageInfo.endCursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (
                  !fetchMoreResult ||
                  !fetchMoreResult.allImages ||
                  !previousResult.allImages
                ) {
                  return {};
                }
                const newEdges = fetchMoreResult.allImages.edges;
                const pageInfo = fetchMoreResult.allImages.pageInfo;
                return {
                  // Put the new comments at the end of the list and update `pageInfo`
                  // so we have the new `endCursor` and `hasNextPage` values
                  allImages: {
                    ...previousResult.allImages,
                    pageInfo,
                    edges: [...previousResult.allImages.edges, ...newEdges],
                  },
                };
              },
            })
          }
        >
          Load more
        </button>
      ) : (
        <em>{`That's your lot!`}</em>
      )}
    </div>
  );
};

export default FalmerMediaList;
