import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import formatDistance from 'date-fns/formatDistance';
import GROUP_DETAIL_QUERY from './GroupDetail.graphql';
import CopyToClipboardButton from '~components/CopyToClipboardButton';
import { StudentGroup } from '~components/OrganisationGrid';
import { HandledQuery } from '~components/HandledQuery';
import { adopt } from '~components/Adopt';
import BackBar from '~components/BackBar/Link';
import { Tags, Tag } from '~components/Tags';
import { FalmerDetailHeader } from '~falmer/components/FalmerDetailHeader';

interface RouteParams {
  groupId: number;
}

interface IProps extends RouteComponentProps<RouteParams> {}

interface Result {
  group: StudentGroup;
}

class GroupDetailQuery extends HandledQuery<Result, {}> {}

interface RenderProps {
  query: {
    data: Result;
  };
}

const Composed = adopt<RenderProps, IProps>({
  query: ({ render, match }) => (
    <GroupDetailQuery
      query={GROUP_DETAIL_QUERY}
      variables={{ groupId: match.params.groupId }}
    >
      {render}
    </GroupDetailQuery>
  ),
});

function FalmerStudentGroupsDetail(props: IProps) {
  return (
    <Composed {...props}>
      {({
        query: {
          data: { group },
        },
      }) => {
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
                      value={`https://falmer.sussexstudent.com/o/g/${
                        group.groupId
                      }`}
                    >
                      Copy sharing link
                    </CopyToClipboardButton>
                  </div>
                )}
              />
            </div>
          </div>
        );
      }}
    </Composed>
  );
}

export default FalmerStudentGroupsDetail;
