import React from 'react';
import AnnualPlan from '~components/AnnualPlan';

class AnnualPlanPage extends React.Component {
  render() {
    return (
      <div>
        <div className="Layout">
          <div>
            <AnnualPlan />
          </div>
        </div>
      </div>
    );
  }
}

export default AnnualPlanPage;
