import React from 'react';
import ContentAPIComposer from '~components/ContentAPIComposer';

class KnowledgeBasePage extends React.Component {
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

export default KnowledgeBasePage;
