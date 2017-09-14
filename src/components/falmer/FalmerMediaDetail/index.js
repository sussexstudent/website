import React from 'react';
import { graphql } from 'react-apollo';
import MediaDetailQuery from './MediaDetail.graphql';
import Loader from '../../Loader';
import ImageTreatmentPreview from '../ImageTreatmentPreview';

function FalmerMediaDetail({ data: { loading, image } }) {
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="Heading Heading--medium">{image.title}</h2>
          <div style={{ margin: '1rem 0' }}>
            This is perhaps an image of:{' '}
            {image.labels.edges.map(edge => (
              <span
                style={{
                  padding: '0.2rem',
                  backgroundColor: '#ffffff',
                  marginRight: '1rem',
                  fontSize: '0.9rem',
                  boxShadow: '1px 1px 0 1px rgba(40, 40, 40, 0.05)',
                }}
                title={`confidence: ${edge.node.confidence}`}
              >
                {edge.node.name}
              </span>
            ))}
          </div>

          <ImageTreatmentPreview image={image} />
        </div>
      )}
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
