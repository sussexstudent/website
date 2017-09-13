import React from 'react';
import { graphql } from 'react-apollo';
import MediaDetailQuery from './MediaDetail.graphql';
import Loader from '../../Loader';
import ImageTreatmentPreview from '../ImageTreatmentPreview';

function FalmerMediaDetail({ data: { loading, image } }) {
  return (
    <div>
      {loading
        ? <Loader />
        : <div>
            <h2 className="Heading Heading--medium">
              {image.title}
            </h2>
            <ImageTreatmentPreview image={image} />
          </div>}
    </div>
  );
}

export default graphql(MediaDetailQuery, {
  options: props => ({
    variables: {
      mediaId: props.match.params.mediaId,
    },
  }),
})(FalmerMediaDetail);
