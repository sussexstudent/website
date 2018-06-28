import React from 'react';
import { Query } from 'react-apollo';
import MEDIA_DETAIL_QUERY from './MediaDetail.graphql';
import Loader from '~components/Loader';
import ImageTreatmentPreview from '../../../components/ImageTreatmentPreview';
import { FalmerImage } from '~types/events';
import { RouteComponentProps } from 'react-router-dom';

interface RouteParams {
  mediaId: number;
}

interface IProps extends RouteComponentProps<RouteParams> {}

interface Result {
  image: FalmerImage;
}

class MediaDetailQuery extends Query<Result, RouteParams> {}

function FalmerMediaDetail(props: IProps) {
  return (
    <MediaDetailQuery
      query={MEDIA_DETAIL_QUERY}
      variables={{
        mediaId: props.match.params.mediaId,
      }}
    >
      {({ loading, data }) => (
        <div>
          {loading || !data ? (
            <Loader />
          ) : (
            <div>
              <h2 className="Heading Heading--medium">{data.image.title}</h2>
              <div style={{ margin: '1rem 0' }}>
                This is perhaps an image of:{' '}
                {data.image.labels.edges.map((edge) => (
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

              <ImageTreatmentPreview image={data.image} />
            </div>
          )}
        </div>
      )}
    </MediaDetailQuery>
  );
}

export default FalmerMediaDetail;
