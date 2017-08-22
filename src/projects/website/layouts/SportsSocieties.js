import React from 'react';
import StudentGroupsDiscovery from '~components/StudentGroupsDiscovery';
import BackBar from '~components/BackBar';

function SportsSocieties() {
  return (
    <div>
      <BackBar href="/get-involved" color="blue">
        Get involved
      </BackBar>
      <div className="Layout">
        <div>
          <StudentGroupsDiscovery />
        </div>
      </div>
    </div>
  );
}

export default SportsSocieties;
