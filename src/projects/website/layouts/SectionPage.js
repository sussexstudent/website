import React from 'react';
import ContentAPIComposer from '@ussu/components/ContentAPIComposer';

class SectionPage extends React.Component {
  render() {
    return (
      <div>
        <div className="Layout">
          <div>
            <ContentAPIComposer pageId={4} />
          </div>
        </div>
      </div>
    );
  }
}

export default SectionPage;
