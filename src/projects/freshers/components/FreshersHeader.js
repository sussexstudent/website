import React from 'react';
import BackBar from '~components/BackBar';
import FreshersNav from './FreshersNav';

function FreshersHeader() {
  return (
    <div className="FreshersHeader">
      <BackBar href="https://sussexstudent.com/" color="white">
        Main site
      </BackBar>

      <FreshersNav />
    </div>
  );
}

FreshersHeader.propTypes = {};

export default FreshersHeader;
