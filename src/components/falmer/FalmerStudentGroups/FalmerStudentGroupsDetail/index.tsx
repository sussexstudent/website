import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import formatDistance from 'date-fns/formatDistance';
import GROUP_DETAIL_QUERY from './GroupDetail.graphql';
import CopyToClipboardButton from '../../../CopyToClipboardButton/index';
import { StudentGroup } from '~components/OrganisationGrid';
import {HandledQuery} from "~components/HandledQuery";

interface RouteParams {
  groupId: number;
}

interface OwnProps extends RouteComponentProps<RouteParams> {}

interface Result {
  group: StudentGroup;
}

class GroupDetailQuery extends HandledQuery<Result, {}> {}

type IProps = OwnProps & { data: Result };

function FalmerStudentGroupsDetailComponent({ data: { group } }: IProps) {
  return (
    <div>
      <h2 className="Heading Heading--medium">{group.name}</h2>
      <CopyToClipboardButton
        value={`https://falmer.sussexstudent.com/o/g/${group.groupId}`}
      >
        Copy sharing link
      </CopyToClipboardButton>

      <div>
        <ul>
          {group.mslGroup ? (
            <li>
              MSL linked, last sync:{' '}
              {formatDistance(
                new Date(),
                new Date(group.mslGroup.lastSync),
              )}{' '}
              ago
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}

function FalmerStudentGroupsDetailConnector(props: OwnProps) {
  return (
    <GroupDetailQuery query={GROUP_DETAIL_QUERY}>
      {({ data }) => {
        if (!data) { return }

        return (
          <FalmerStudentGroupsDetailComponent {...props} data={data} />
        )
      }}
    </GroupDetailQuery>
  )
}

export default FalmerStudentGroupsDetailConnector;
