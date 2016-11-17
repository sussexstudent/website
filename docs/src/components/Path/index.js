import React from 'react';

import './Path.css';

function Path(props) {
  return (
    <a className="Path" href="http://github.com/ussu/site/master/src/">{props.location}</a>
  );
}

Path.propTypes = {
  location: React.PropTypes.string,
};

export default Path;
