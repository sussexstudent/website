import React from 'react';
import SLATE_DETAIL_QUERY from './SlateDetail.graphql';
import UPDATE_SLATE_MUTATION from './UpdateSlate.graphql';
import { Loader } from '@ussu/website/src/components/Loader';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';
import { SlateEditor } from '../SlateEditor';
import { InternalSlate } from '@ussu/common/src/types/slates';

type FalmerSlateDetailProps = RouteComponentProps<{
  slateId: string | undefined;
}>;

interface Result {
  slate: InternalSlate;
}

export const FalmerSlateDetail: React.FC<FalmerSlateDetailProps> = ({
  match: {
    params: { slateId },
  },
}) => {
  const { data, loading } = useQuery<Result>(SLATE_DETAIL_QUERY, {
    variables: { slateId },
  });

  const [updateSlate] = useMutation(UPDATE_SLATE_MUTATION);

  return (
    <div>
      {loading || !data ? (
        <Loader />
      ) : (
        <div>
          <h2>Edit slate</h2>
          <SlateEditor
            data={data.slate.data}
            onSave={(data) =>
              updateSlate({
                variables: {
                  slateId,
                  data: { data },
                },
              })
            }
          />
        </div>
      )}
    </div>
  );
};
