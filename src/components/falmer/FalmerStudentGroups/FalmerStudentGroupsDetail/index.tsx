import React from 'react';
import { graphql } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import formatDistance from 'date-fns/formatDistance';
import GroupDetailQuery from './GroupDetail.graphql';
import Loader from '../../../Loader';
import CopyToClipboardButton from '../../../CopyToClipboardButton/index';
import { ApolloHandlerChildProps } from '~components/apolloHandler';
import { StudentGroup } from '~components/OrganisationGrid';
import { compose } from 'recompose';

interface RouteParams {
  groupId: number;
}

interface OwnProps extends RouteComponentProps<RouteParams> {}

interface Result {
  group: StudentGroup;
}

type IProps = ApolloHandlerChildProps<OwnProps, Result>;

function FalmerStudentGroupsDetail({ data: { loading, group } }: IProps) {
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
}

export default compose<IProps, OwnProps>(
  graphql<Result, OwnProps>(GroupDetailQuery, {
    options: (props) => ({
      variables: {
        groupId: props.match.params.groupId,
      },
    }),
  }),
)(FalmerStudentGroupsDetail);
