import React from 'react';
import PolicyGenerator from '~components/PolicyGenerator';

class PolicyIdeaGeneratorPage extends React.Component {
  render() {
    return (
      <div>
        <div className="Layout">
          <div>
            <PolicyGenerator />
          </div>
        </div>
      </div>
    );
  }
}

export default PolicyIdeaGeneratorPage;
