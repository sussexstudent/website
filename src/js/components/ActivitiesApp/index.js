import React from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import { forceCheck } from 'react-lazyload';
import OrgansiationGrid from '../../components/OrgansiationGrid';

class ActivitiesApp extends React.Component {
  constructor(props) {
    super(props);

    this.fuse = new Fuse(props.organsiationList, { keys: ['name'], id: 'id' });

    this.state = {
      filter: null,
      searchValue: '',
      displayIds: props.allIds,
    };

    this.onSearchUpdate = this.onSearchUpdate.bind(this);
  }

  onSearchUpdate(e) {
    const searchValue = e.target.value;
    this.setState(
      {
        searchValue,
        displayIds: searchValue
          ? this.fuse.search(searchValue)
          : this.props.allIds,
      },
      () => {
        forceCheck();
      }
    );
  }

  render() {
    const map = this.props.organsiationMap;

    const { searchValue, displayIds } = this.state;
    return (
      <div className="ActivitiesApp__">
        <div className="ActivitiesApp__header">
          <h1>Find sports and societies</h1>
          <input
            className="ActivitiesApp__searchInput"
            type="search"
            placeholder="Search"
            value={searchValue}
            onChange={this.onSearchUpdate}
          />
          <div className="ActivitiesApp__filterStat">
            Displaying {displayIds.length} clubs & societies
          </div>
        </div>
        <div className="ActivitiesApp__main">
          <aside className="ActivitiesApp__sidebar">
            <ul>
              <li />
            </ul>
          </aside>
          <div className="ActivitiesApp__grid">
            <OrgansiationGrid organsiations={displayIds.map(id => map[id])} />
          </div>
        </div>
      </div>
    );
  }
}

ActivitiesApp.propTypes = {
  organsiationMap: PropTypes.shape({}).isRequired,
  organsiationList: PropTypes.arrayOf().isRequired,
  allIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ActivitiesApp;
