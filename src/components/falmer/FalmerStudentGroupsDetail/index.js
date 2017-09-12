import React from 'react';
import { graphql } from 'react-apollo';
import GroupDetailQuery from './GroupDetail.graphql';
import Loader from '../../Loader';
import CopyToClipboardButton from '../../CopyToClipboardButton/index';

function FalmerStudentGroupsDetail({ data: { loading, group } }) {
  return (
    <div>
      <h1>Student Groups</h1>
      {loading
        ? <Loader />
        : <div>
            <h2>
              {group.name}
            </h2>
            <CopyToClipboardButton
              value={`https://falmer.sussexstudent.com/o/g/${group.groupId}`}
            >
              Copy sharing link
            </CopyToClipboardButton>
          </div>}
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
