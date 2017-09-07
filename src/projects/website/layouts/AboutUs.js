import React from 'react';
import PropTypes from 'prop-types';
import ContentAPIComposer from '~components/ContentAPIComposer';

class AboutUs extends React.Component {
  render() {
    return (
      <div>
        <div className="Layout">
          <div>
            <ContentAPIComposer pageId="13" />
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
