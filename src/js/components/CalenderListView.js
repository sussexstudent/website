import React from 'react';
import PropTypes from 'prop-types';
import CalenderListDay from './CalenderListDay';

class CalenderListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPrevious: null,
    };
  }

  render() {
    return (
      <ul>
        {this.props.days.map(day => <CalenderListDay day={day} />)}
      </ul>
    );
  }
}

CalenderListView.propTypes = {
  days: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CalenderListView;
