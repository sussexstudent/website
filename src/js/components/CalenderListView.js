import React from 'react';
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
  days: React.PropTypes.arrayOf(React.PropTypes.shape({})),
};

export default CalenderListView;
