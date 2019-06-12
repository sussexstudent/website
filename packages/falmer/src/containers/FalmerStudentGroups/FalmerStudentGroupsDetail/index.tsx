import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import GROUP_DETAIL_QUERY from './GroupDetail.graphql';
import CopyToClipboardButton from '@ussu/website/src/components/CopyToClipboardButton';
import BackBar from '@ussu/website/src/components/BackBar/Link';
import { Tags, Tag } from '@ussu/website/src/components/Tags';
import { FalmerDetailHeader } from '../../../components/FalmerDetailHeader';
import { useQuery } from 'react-apollo-hooks';
import { StudentGroup } from '@ussu/common/src/types/groups';

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
