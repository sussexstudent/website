import React from 'react';
import MEDIA_DETAIL_QUERY from './MediaDetail.graphql';
import { Loader } from '@ussu/website/src/components/Loader';
import ImageTreatmentPreview from '../../../components/ImageTreatmentPreview';
import { FalmerImage } from '@ussu/common/src/types/events';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';

type FalmerMediaDetailProps = RouteComponentProps<{
  mediaId: string | undefined;
}>;

interface Result {
  image: FalmerImage;
}

const FalmerMediaDetail: React.FC<FalmerMediaDetailProps> = ({
  match: {
    params: { mediaId },
  },
}) => {
  const { data, loading } = useQuery<Result>(MEDIA_DETAIL_QUERY, {
    variables: { mediaId },
  });

  return (
    <div>
      {loading || !data ? (
        <Loader />
      ) : (
        <div>
          <h2 className="Heading Heading--medium">{data.image.title}</h2>
          {data.image.labels.edges.length > 0 ? (
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
                  key={edge.node.id}
                >
                  {edge.node.name}
                </span>
              ))}
            </div>
          ) : null}

          <ImageTreatmentPreview image={data.image} />
        </div>
      )}
    </div>
  );
};

export default FalmerMediaDetail as any;
