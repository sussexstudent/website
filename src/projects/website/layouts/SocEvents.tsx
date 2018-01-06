import React from 'react';
import { WithoutSSR as ContentAPIComposerWithoutSSR } from '~components/ContentAPIComposer';

class SocEvents extends React.Component {
  render() {
    return (
      <div>
        <div className="Layout">
          <div>
            <ContentAPIComposerWithoutSSR pageId="14" />
          </div>
        </div>
      </div>
    );
  }
}

export default SocEvents;
