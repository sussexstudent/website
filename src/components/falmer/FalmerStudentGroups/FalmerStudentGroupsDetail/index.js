import React from 'react';
import { graphql } from 'react-apollo';
import formatDistance from 'date-fns/formatDistance';
import GroupDetailQuery from './GroupDetail.graphql';
import Loader from '../../../Loader';
import CopyToClipboardButton from '../../../CopyToClipboardButton/index';

function FalmerStudentGroupsDetail({ data: { loading, group } }) {
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
                    new Date(group.mslGroup.lastSync)
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

export default graphql(GroupDetailQuery, {
  options: props => ({
    variables: {
      groupId: props.match.params.groupId,
    },
  }),
})(FalmerStudentGroupsDetail);
