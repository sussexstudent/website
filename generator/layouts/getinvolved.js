import React from 'react';
import PropTypes from 'prop-types';
import ContentAPIComposer from '../../src/js/components/ContentAPIComposer/index';

class GetInvolved extends React.Component {
  render() {
    return (
      <div>
        <div className="Layout">
          <div>
            <ContentAPIComposer pageId="10" />
          </div>
        </div>
      </div>
    );
  }
}

export default GetInvolved;
