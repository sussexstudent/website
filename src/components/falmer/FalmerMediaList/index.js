import React from 'react';
import { graphql } from 'react-apollo';
import AllGroupsQuery from './AllMedia.graphql';
import Loader from '../../Loader';
import Image from '../../Image';
import FauxRouterLink from '../../FauxRouterLink';

function FalmerMediaList({ data: { loading, allImages } }) {
  return (
    <div>
      {loading
        ? <Loader />
        : <ul className="FalmerMediaGrid">
            {allImages.edges.map(edge =>
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
            )}
          </ul>}
    </div>
  );
}

export default graphql(AllGroupsQuery)(FalmerMediaList);
