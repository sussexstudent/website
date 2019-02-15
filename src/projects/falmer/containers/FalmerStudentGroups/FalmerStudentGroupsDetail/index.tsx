import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import GROUP_DETAIL_QUERY from './GroupDetail.graphql';
import CopyToClipboardButton from '~components/CopyToClipboardButton';
import { StudentGroup } from '~components/OrganisationGrid';
import BackBar from '~components/BackBar/Link';
import { Tags, Tag } from '~components/Tags';
import { FalmerDetailHeader } from '~falmer/components/FalmerDetailHeader';
import { useQuery } from 'react-apollo-hooks';

interface IProps {
  groupId: number;
}

interface Result {
  group: StudentGroup;
}

const FalmerStudentGroupsDetail: React.FC<IProps> = ({ groupId }) => {
  const { data, loading } = useQuery<Result>(GROUP_DETAIL_QUERY, {
    variables: { groupId },
  });
  if (loading || !data) {
    return null;
  }

  const group = data.group;

  return (
    <div>
      <BackBar to="/groups">Groups</BackBar>
      <div>
        <FalmerDetailHeader
          title={group.name}
          tags={() => (
            <Tags>
              {group.mslGroup ? <Tag>MSL</Tag> : null}
              {group.mslGroup ? (
                <Tag>
                  last sync:{' '}
                  {formatDistance(
                    new Date(),
                    new Date(group.mslGroup.lastSync),
                  )}{' '}
                  ago
                </Tag>
              ) : null}
            </Tags>
          )}
          actions={() => (
            <div>
              <CopyToClipboardButton
                value={`https://falmer.sussexstudent.com/o/g/${group.groupId}`}
              >
                Copy sharing link
              </CopyToClipboardButton>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default FalmerStudentGroupsDetail as any;
