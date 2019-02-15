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
  allImages: Connection<FalmerImage>;
}

const FalmerMediaList: React.FC = () => {
  const { data, loading, error } = useQuery<Result>(ALL_MEDIA_QUERY);

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorState />;
  }

  console.log(data);

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
        <button className="Button">Load more</button>
      ) : (
        <em>{`That's your lot!`}</em>
      )}
    </div>
  );
};

export default FalmerMediaList;
